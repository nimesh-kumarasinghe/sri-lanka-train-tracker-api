const trainModel = require("../models/trainModel");

const getAllTrains = async () => {
  return trainModel.getAllTrains();
};

const getTrainById = async (id) => {
  return trainModel.getTrainById(id);
};

module.exports = {
  getAllTrains,
  getTrainById,
};
