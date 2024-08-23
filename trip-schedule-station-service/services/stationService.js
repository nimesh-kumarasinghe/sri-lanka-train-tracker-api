const stationModel = require("../models/stationModel");

// get all station details
const getAllStations = async () => {
  return stationModel.getAllStations();
};

// get station details by id
const getStationById = async (id) => {
  return stationModel.getStationById(id);
};

module.exports = {
  getAllStations,
  getStationById,
};
