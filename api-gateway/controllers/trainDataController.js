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

module.exports = {
  getAllTrainData,
};
