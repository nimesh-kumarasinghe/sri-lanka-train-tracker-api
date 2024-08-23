const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllStations = async (req, res) => {
  try {
    const response = await axios.get(
      `${config.tripScheduleServiceUrl}/stations`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const getStationById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${config.tripScheduleServiceUrl}/stations/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const createStation = async (req, res) => {
  try {
    const response = await axios.post(
      `${config.tripScheduleServiceUrl}/stations`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const updateStation = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${config.tripScheduleServiceUrl}/stations/${id}`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const deleteStation = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${config.tripScheduleServiceUrl}/stations/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json({ message: "Station deleted" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
