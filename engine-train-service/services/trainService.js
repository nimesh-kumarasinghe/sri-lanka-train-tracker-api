const trainModel = require("../models/trainModel");

const getAllTrains = async () => {
  return trainModel.getAllTrains();
};

module.exports = {
  getAllTrains,
};
