const tripStationAssignModel = require("../models/tripStationAssignModel");

// get all stations details
const getAllTripStations = async () => {
  return tripStationAssignModel.getAllTripStations();
};

// get station details by trip id
const getStationByTripId = async (id) => {
  return tripStationAssignModel.getStationByTripId(id);
};

// assign a station for a trip
const assignStation = async (
  trip_id,
  station_id,
  arrival_time,
  departure_time
) => {
  return tripStationAssignModel.assignStation(
    trip_id,
    station_id,
    arrival_time,
    departure_time
  );
};

// update a assigned station for a trip
const updateAssignStation = async (id, updates) => {
  return tripStationAssignModel.updateAssignStation(id, updates);
};

// delete a assigned station for a trip
const deleteAssignStation = async (id) => {
  return tripStationAssignModel.deleteAssignStation(id);
};

module.exports = {
  getAllTripStations,
  getStationByTripId,
  assignStation,
  updateAssignStation,
  deleteAssignStation,
};
