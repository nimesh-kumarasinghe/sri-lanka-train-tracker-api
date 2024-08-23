const tripModel = require("../models/tripModel");

// get all trip details
const getAllTrips = async () => {
  return tripModel.getAllTrips();
};

// get trip details by id
const getTripById = async (id) => {
  return tripModel.getTripById(id);
};

module.exports = {
  getAllTrips,
  getTripById,
};
