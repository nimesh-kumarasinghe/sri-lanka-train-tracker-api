const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllTrips = async (req, res) => {
  try {
    const response = await axios.get(`${config.tripScheduleServiceUrl}/trips`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const getTripById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${config.tripScheduleServiceUrl}/trips/${id}`,
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

const createTrip = async (req, res) => {
  try {
    const response = await axios.post(
      `${config.tripScheduleServiceUrl}/trips`,
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

const updateTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${config.tripScheduleServiceUrl}/trips/${id}`,
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

const deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${config.tripScheduleServiceUrl}/trips/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json({ message: "Trip deleted" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};
