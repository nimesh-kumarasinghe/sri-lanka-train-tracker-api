const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllLines = async (req, res) => {
  try {
    const response = await axios.get(`${config.lineRouteServiceUrl}/lines`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

// Get line by ID
const getLineById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${config.lineRouteServiceUrl}/lines/${id}`,
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

// Create a new line
const createLine = async (req, res) => {
  try {
    const response = await axios.post(
      `${config.lineRouteServiceUrl}/lines`,
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

// Update an existing line
const updateLine = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${config.lineRouteServiceUrl}/lines/${id}`,
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

// Delete a line
const deleteLine = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${config.lineRouteServiceUrl}/lines/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json({ message: "Line deleted" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllLines,
  getLineById,
  createLine,
  updateLine,
  deleteLine,
};
