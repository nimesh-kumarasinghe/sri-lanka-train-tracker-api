const stationService = require("../services/stationService");

// get all station details
const getAllStations = async (req, res) => {
  try {
    const stations = await stationService.getAllStations();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get station details by id
const getStationById = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await stationService.getStationById(id);
    if (station) {
      res.json(station);
    } else {
      res.status(404).json({ message: "Station not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllStations,
  getStationById,
};
