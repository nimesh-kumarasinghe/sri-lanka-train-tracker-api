const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllTrainData = async (req, res) => {
  try {
    const response = await axios.get(
      `${config.locationServiceUrl}/v1/trains/summary`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

// Get train data by start and end stations
const getTrainDataByStations = async (req, res) => {
  const { startStationName, endStationName } = req.query;

  // Validate the presence of required query parameters
  if (!startStationName || !endStationName) {
    return res
      .status(400)
      .json({ error: "startStationName and endStationName are required" });
  }

  try {
    const response = await axios.get(
      `${config.locationServiceUrl}/v1/trains/summary/by-stations`,
      {
        params: {
          startStationName,
          endStationName,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllTrainData,
  getTrainDataByStations,
};
