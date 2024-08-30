const Location = require("../models/locationModel");
const axios = require("axios");
require("dotenv").config();

const updateLocationData = async (data) => {
  const {
    iotDeviceId,
    location,
    speed,
    timestamp,
    signalStrength,
    locationName,
  } = data;

  try {
    // Check if the iotDeviceId already exists in the database
    const existingLocation = await Location.findOne({ iotDeviceId });

    if (existingLocation) {
      // If it exists, update the speed, signal strength, location name, location and timestamp only
      existingLocation.location = location;
      existingLocation.speed = speed;
      existingLocation.timestamp = timestamp;
      existingLocation.signalStrength = signalStrength;
      existingLocation.locationName = locationName;
      await existingLocation.save();
    } else {
      // Fetch trainId using iotDeviceId from engine_train microservice
      const engineRes = await axios.get(
        `${process.env.ENGINE_TRAIN_SERVICE_URL}/engine-trains/${iotDeviceId}`
      );
      const trainId = engineRes.data.train_id;

      // Fetch train name and route id using train from engine_train microservice
      const trainRes = await axios.get(
        `${process.env.ENGINE_TRAIN_SERVICE_URL}/trains/${trainId}`
      );
      const trainName = trainRes.data.train_name;
      const trainRouteId = trainRes.data.route_id;

      // Fetch startStation and endStation using routeId from line_route microservice
      const routeInfoRes = await axios.get(
        `${process.env.LINE_ROUTE_SERVICE_URL}/routes/${trainRouteId}`
      );
      const startStationName = routeInfoRes.data.start_station;
      const endStationName = routeInfoRes.data.end_station;

      // Fetch tripId, tripType, duration using trainId from trip_schedule microservice
      const tripRes = await axios.get(
        `${process.env.TRIP_SCHEDULE_SERVICE_URL}/trip-trains/${trainId}`
      );
      const tripId = tripRes.data.trip_id;
      const tripType = tripRes.data.trip_type;
      const duration = tripRes.data.duration;

      // Fetch availability, start time and end time using tripId from trip_schedule microservice
      const scheduleRes = await axios.get(
        `${process.env.TRIP_SCHEDULE_SERVICE_URL}/schedules/trip/${tripId}`
      );
      const availability = scheduleRes.data.availability;
      const startTime = scheduleRes.data.start_time;
      const endTime = scheduleRes.data.end_time;

      // Fetch stationId using tripId from trip_schedule_station microservice
      const tripStationRes = await axios.get(
        `${process.env.TRIP_SCHEDULE_SERVICE_URL}/trip-stations/${tripId}`
      );

      // Assuming tripStationRes.data is an array of stations with arrival and departure times
      const stations = await Promise.all(
        tripStationRes.data.map(async (station) => {
          const { station_id, arrival_time, departure_time } = station;

          // Fetch station details for each station ID
          const stationRes = await axios.get(
            `${process.env.TRIP_SCHEDULE_SERVICE_URL}/stations/${station_id}`
          );

          return {
            stationName: stationRes.data.station_name,
            latitude: stationRes.data.latitude,
            longitude: stationRes.data.longitude,
            arrivalTime: arrival_time, // Set specific arrival time for this station
            departureTime: departure_time, // Set specific departure time for this station
          };
        })
      );
      // Insert the new location data in MongoDB
      const newLocation = new Location({
        iotDeviceId,
        location,
        speed,
        timestamp,
        signalStrength,
        locationName,
        tripId,
        trainName,
        startStationName,
        endStationName,
        tripType,
        duration,
        availability,
        startTime,
        endTime,
        stations,
      });

      await newLocation.save();
    }
  } catch (err) {
    throw new Error("Error updating location data");
  }
};

module.exports = {
  updateLocationData,
};
