const tripStationAssignService = require("../services/tripStationAssignService");

// get all tripStationn details
const getAllTripStations = async (req, res) => {
  try {
    const stations = await tripStationAssignService.getAllTripStations();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get station details by trip id
const getStationByTripId = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await tripStationAssignService.getStationByTripId(id);
    if (station) {
      res.json(station);
    } else {
      res.status(404).json({ message: "Stations not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// assign a station for a trip
const assignStation = async (req, res) => {
  const { trip_id, station_id, arrival_time, departure_time } = req.body;
  try {
    const newstation = await tripStationAssignService.assignStation(
      trip_id,
      station_id,
      arrival_time,
      departure_time
    );
    res.status(201).json(newstation);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// update a assigned station for a trip
const updateAssignStation = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updateAssignStation =
      await tripStationAssignService.updateAssignStation(id, updates);
    if (updateAssignStation) {
      res.json(updateAssignStation);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// delete a assigned station for a trip
const deleteAssignStation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tripStationAssignService.deleteAssignStation(id);

    if (result.affectedRows > 0) {
      res
        .status(201)
        .json({ message: "Assigned station deleted successfully" });
    } else {
      res.status(404).json({ message: "Station not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllTripStations,
  getStationByTripId,
  assignStation,
  updateAssignStation,
  deleteAssignStation,
};
