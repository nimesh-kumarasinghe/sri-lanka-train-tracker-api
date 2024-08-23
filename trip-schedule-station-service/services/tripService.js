const tripModel = require("../models/tripModel");

// get all trip details
const getAllTrips = async () => {
  return tripModel.getAllTrips();
};

// get trip details by id
const getTripById = async (id) => {
  return tripModel.getTripById(id);
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

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
};
