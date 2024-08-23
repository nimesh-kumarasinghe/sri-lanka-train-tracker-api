const axios = require("axios");
const config = require("../config/gatewayConfig");

const getAllRoutes = async (req, res) => {
  try {
    const response = await axios.get(`${config.lineRouteServiceUrl}/routes`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

// Get route by ID
const getRouteById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${config.lineRouteServiceUrl}/routes/${id}`,
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

// Create a new route
const createRoute = async (req, res) => {
  try {
    const response = await axios.post(
      `${config.lineRouteServiceUrl}/routes`,
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

// Update an existing route
const updateRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${config.lineRouteServiceUrl}/routes/${id}`,
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

// Delete a route
const deleteRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${config.lineRouteServiceUrl}/routes/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json({ message: "Route deleted" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
};
