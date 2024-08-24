const Location = require("../models/locationModel");
const axios = require("axios");

const updateLocationData = async (data) => {
  const { iotDeviceId, location, speed, timestamp, signalStrength } = data;

  try {
    // Fetch trainId using iotDeviceId from engine_train microservice
    const trainRes = await axios.get(
      `${process.env.ENGINE_TRAIN_SERVICE_URL}/engines/${iotDeviceId}`
    );
    const trainId = trainRes.data.trainId;

    // Fetch tripId, tripType, startTime, endTime using trainId from trip_schedule microservice
    const tripRes = await axios.get(
      `${process.env.TRIP_SCHEDULE_SERVICE_URL}/trains/${trainId}`
    );
    const { tripId, tripType, startTime, endTime } = tripRes.data;

    // Fetch routeId using trainId from engine_train microservice
    const routeRes = await axios.get(
      `${process.env.ENGINE_TRAIN_SERVICE_URL}/trains/${trainId}`
    );
    const routeId = routeRes.data.routeId;

    // Fetch startStation and endStation using routeId from line_route microservice
    const routeInfoRes = await axios.get(
      `${process.env.LINE_ROUTE_SERVICE_URL}/routes/${routeId}`
    );
    const { startStation, endStation } = routeInfoRes.data;

    // Update or insert the location data in MongoDB
    const updateData = {
      trainId,
      tripId,
      tripType,
      startTime,
      endTime,
      routeId,
      startStation,
      endStation,
      timestamp,
      location,
      speed,
      signalStrength,
    };

    await Location.findOneAndUpdate({ iotDeviceId }, updateData, {
      upsert: true,
      new: true,
    });
  } catch (err) {
    console.error("Error updating location data:", err);
    throw new Error("Error updating location data");
  }
};

module.exports = {
  updateLocationData,
};
