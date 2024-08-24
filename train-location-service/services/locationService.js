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
      // If it exists, update the location and timestamp only
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

      const stationIds = tripStationRes.data.map(
        (station) => station.station_id
      );

      // Fetch station details for each station ID and store them in an array
      const stations = await Promise.all(
        stationIds.map(async (stationId) => {
          const stationRes = await axios.get(
            `${process.env.TRIP_SCHEDULE_SERVICE_URL}/stations/${stationId}`
          );
          return {
            stationName: stationRes.data.station_name,
            latitude: stationRes.data.latitude,
            longitude: stationRes.data.longitude,
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
