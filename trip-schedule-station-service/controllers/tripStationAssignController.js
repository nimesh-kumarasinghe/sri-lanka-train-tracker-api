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

module.exports = {
  getAllTripStations,
  getStationByTripId,
};
