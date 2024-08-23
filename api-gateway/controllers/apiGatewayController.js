// src/controllers/apiGatewayController.js
const axios = require("axios");
const config = require("../config/gatewayConfig");
const authService = require("../services/authService");
const encryptionUtils = require("../utils/encryptionUtils");

// Helper function to send requests to services
const sendRequest = async (url, method, data) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Service Error");
  }
};

// Register user
const register = async (req, res) => {
  const { user_id, password, role } = req.body;
  try {
    const hashedPassword = await encryptionUtils.hashPassword(password);
    const data = await sendRequest(
      `${config.userServiceUrl}/register`,
      "POST",
      { user_id, password: hashedPassword, role }
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
const login = async (req, res) => {
  const { user_id, password } = req.body;
  try {
    const data = await sendRequest(`${config.userServiceUrl}/login`, "POST", {
      user_id,
      password,
    });
    const token = authService.generateToken(data.user_id, data.role);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await sendRequest(
      `${config.userServiceUrl}/users/${id}`,
      "GET"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const data = await sendRequest(
      `${config.userServiceUrl}/users/${id}`,
      "PUT",
      updates
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await sendRequest(
      `${config.userServiceUrl}/users/${id}`,
      "DELETE"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTrains = async (req, res) => {
  try {
    const data = await sendRequest(
      `${config.engineTrainServiceUrl}/trains`,
      "GET"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTrain = async (req, res) => {
  try {
    const data = await sendRequest(
      `${config.engineTrainServiceUrl}/trains`,
      "POST",
      req.body
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Define other methods similarly...

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  getAllTrains,
  createTrain,
  // Other methods...
};
