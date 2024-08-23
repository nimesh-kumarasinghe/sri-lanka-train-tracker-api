const axios = require("axios");
const config = require("../config/gatewayConfig");

// get all trains
const getAllTrains = async (req, res) => {
  try {
    const response = await axios.get(
      `${config.engineTrainServiceUrl}/trains`,
      {}
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

// get train by id
const getTrainById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${config.engineTrainServiceUrl}/trains/${id}`,
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

// create a train
const createTrain = async (req, res) => {
  try {
    const response = await axios.post(
      `${config.engineTrainServiceUrl}/trains`,
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

// update a train
const updateTrain = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(
      `${config.engineTrainServiceUrl}/trains/${id}`,
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

// delete a train
const deleteTrain = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(
      `${config.engineTrainServiceUrl}/trains/${id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    res.status(200).json({ message: "Train deleted" });
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllTrains,
  createTrain,
  updateTrain,
  deleteTrain,
  getTrainById,
};
