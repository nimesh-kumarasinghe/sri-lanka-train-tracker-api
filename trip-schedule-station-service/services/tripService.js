const tripModel = require("../models/tripModel");

// get all trip details
const getAllTrips = async () => {
  return tripModel.getAllTrips();
};

// get trip details by id
const getTripById = async (id) => {
  return tripModel.getTripById(id);
};

// get trip type and duration details by train id
const getTripByTrainId = async (id) => {
  return tripModel.getTripByTrainId(id);
};

// create a trip
const createTrip = async (
  trip_id,
  route_id,
  train_id,
  trip_type,
  duration,
  max_speed_kmh
) => {
  return tripModel.createTrip(
    trip_id,
    route_id,
    train_id,
    trip_type,
    duration,
    max_speed_kmh
  );
};

// update trip details
const updateTrip = async (id, updates) => {
  return tripModel.updateTrip(id, updates);
};

// delete a trip
const deleteTrip = async (id) => {
  return tripModel.deleteTrip(id);
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  getTripByTrainId,
};
