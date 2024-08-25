const locationService = require("../services/locationService");
const Location = require("../models/locationModel");

const updateLocation = async (req, res) => {
  try {
    const data = req.body;
    await locationService.updateLocationData(data);
    res.status(200).json({ message: "Location data inserted successfully" });
  } catch (err) {
    console.error("Error in updateLocation controller:", err);
    res.status(500).json({ error: "Failed to insert location data" });
  }
};

// get all data from location collection
const getAllTrainData = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    console.error("Error in getAllLocations controller:", err);
    res.status(500).json({ error: "Failed to retrieve location data" });
  }
};

// get trains by start and end stations
const getTrainDataByStations = async (req, res) => {
  const { startStationName, endStationName } = req.query;

  if (!startStationName || !endStationName) {
    return res
      .status(400)
      .json({ error: "startStationName and endStationName are required" });
  }

  try {
    // Query MongoDB to find documents matching the start and end station names
    const locations = await Location.find({
      startStationName: { $regex: new RegExp(`^${startStationName}$`, "i") },
      endStationName: { $regex: new RegExp(`^${endStationName}$`, "i") },
    });

    if (locations.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the provided station names" });
    }

    res.status(200).json(locations);
  } catch (err) {
    console.error("Error in getTrainDataByStations controller:", err);
    res.status(500).json({ error: "Failed to retrieve location data" });
  }
};
module.exports = {
  updateLocation,
  getAllTrainData,
  getTrainDataByStations,
};
