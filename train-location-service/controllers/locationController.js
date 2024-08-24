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

module.exports = {
  updateLocation,
  getAllTrainData,
};
