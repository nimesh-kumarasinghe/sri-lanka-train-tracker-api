const stationModel = require("../models/stationModel");

// get all station details
const getAllStations = async () => {
  return stationModel.getAllStations();
};

// get station details by id
const getStationById = async (id) => {
  return stationModel.getStationById(id);
};

// create a station
const createStation = async (station_id, station_name, latitude, longitude) => {
  return stationModel.createStation(
    station_id,
    station_name,
    latitude,
    longitude
  );
};

// update station details
const updateStation = async (id, updates) => {
  return stationModel.updateStation(id, updates);
};

// delete a station
const deleteStation = async (id) => {
  return stationModel.deleteStation(id);
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
