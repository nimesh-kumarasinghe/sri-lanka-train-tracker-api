const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllSchedules = async (req, res) => {
  try {
    const response = await axios.get(
      `${config.tripScheduleServiceUrl}/schedules`,
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

const getScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${config.tripScheduleServiceUrl}/schedules/${id}`,
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

const createSchedule = async (req, res) => {
  try {
    const response = await axios.post(
      `${config.tripScheduleServiceUrl}/schedules`,
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

const updateSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${config.tripScheduleServiceUrl}/schedules/${id}`,
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

const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${config.tripScheduleServiceUrl}/schedules/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json({ message: "Schedule deleted" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
