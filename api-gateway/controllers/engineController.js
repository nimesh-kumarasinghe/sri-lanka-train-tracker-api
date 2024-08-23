const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllEngines = async (req, res) => {
  try {
    const response = await axios.get(
      `${config.engineTrainServiceUrl}/engines`,
      {
        headers: {
          Authorization: req.headers.authorization, // Forward the token
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const getEngineById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${config.engineTrainServiceUrl}/engines/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization, // Forward the token
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const createEngine = async (req, res) => {
  try {
    const response = await axios.post(
      `${config.engineTrainServiceUrl}/engines`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization, // Forward the token
        },
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const updateEngine = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${config.engineTrainServiceUrl}/engines/${id}`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization, // Forward the token
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

const deleteEngine = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${config.engineTrainServiceUrl}/engines/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization, // Forward the token
        },
      }
    );
    res.status(200).json({ message: "Engine deleted" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllEngines,
  getEngineById,
  createEngine,
  updateEngine,
  deleteEngine,
};
