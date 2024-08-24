const locationService = require("../services/locationService");

const updateLocation = async (req, res) => {
  try {
    const data = req.body;
    await locationService.updateLocationData(req.body);
    res.status(200).json({ message: "Location data updated successfully" });
    return data;
  } catch (err) {
    res.status(500).json({ error: "Failed to update location data" });
  }
};

module.exports = {
  updateLocation,
};
