const tripStationAssignModel = require("../models/tripStationAssignModel");

// get all stations details
const getAllTripStations = async () => {
  return tripStationAssignModel.getAllTripStations();
};

// get station details by trip id
const getStationByTripId = async (id) => {
  return tripStationAssignModel.getStationByTripId(id);
};

module.exports = {
  getAllTripStations,
  getStationByTripId,
};
