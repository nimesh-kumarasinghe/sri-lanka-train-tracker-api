const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllTripStations = async (req, res) => {
  try {
    const response = await axios.get(
      `${config.tripScheduleServiceUrl}/trip-stations`,
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

// Get station by trip ID
const getStationByTripId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${config.tripScheduleServiceUrl}/trip-stations/${id}`,
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

// Assign station to a trip
const assignStation = async (req, res) => {
  try {
    const response = await axios.post(
      `${config.tripScheduleServiceUrl}/trip-stations`,
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

// Update assigned station
const updateAssignStation = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${config.tripScheduleServiceUrl}/trip-stations/${id}`,
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

// Delete assigned station
const deleteAssignStation = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${config.tripScheduleServiceUrl}/trip-stations/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json({ message: "Assigned station deleted" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllTripStations,
  getStationByTripId,
  assignStation,
  updateAssignStation,
  deleteAssignStation,
};
