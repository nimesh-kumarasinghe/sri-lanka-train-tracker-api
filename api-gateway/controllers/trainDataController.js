const axios = require("axios");
const config = require("../config/gatewayConfig");

// Get all train data
const getAllTrainData = async (req, res) => {
  try {
    // Extract pagination parameters from the query string
    const { page = 1, limit = 10 } = req.query;

    // Forward the pagination parameters to the location service
    const response = await axios.get(
      `${config.locationServiceUrl}/v1/trains/summary`,
      {
        params: { page, limit },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

// Get train data by start and end stations
const getTrainDataByStations = async (req, res) => {
  const { startStationName, endStationName, page = 1, limit = 10 } = req.query;

  // Validate the presence of required query parameters
  if (!startStationName || !endStationName) {
    return res
      .status(400)
      .json({ error: "startStationName and endStationName are required" });
  }

  // Validate pagination parameters
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  if (pageNumber < 1 || pageSize < 1) {
    return res.status(400).json({ error: "Invalid page number or limit" });
  }

  try {
    const response = await axios.get(
      `${config.locationServiceUrl}/v1/trains/summary/by-stations`,
      {
        params: {
          startStationName,
          endStationName,
          page: pageNumber,
          limit: pageSize,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getTrainDataByStations,
};

module.exports = {
  getAllTrainData,
  getTrainDataByStations,
};
