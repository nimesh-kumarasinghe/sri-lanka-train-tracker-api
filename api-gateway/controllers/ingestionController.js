const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllTrainGpsData = async (req, res) => {
  try {
    const response = await axios.get(`${config.ingestionServiceUrl}/gps-data`, {
      headers: {
        Authorization: req.headers.authorization, // Forward the token
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllTrainGpsData,
};
