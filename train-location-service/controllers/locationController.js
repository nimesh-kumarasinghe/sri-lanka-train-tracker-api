const locationService = require("../services/locationService");

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

module.exports = {
  updateLocation,
};
