const trainModel = require("../models/trainModel");

const getAllTrains = async () => {
  return trainModel.getAllTrains();
};

const getTrainById = async (id) => {
  return trainModel.getTrainById(id);
};

const createTrain = async (
  train_id,
  route_id,
  train_name,
  no_of_boxes,
  passenger_capacity,
  first_class,
  second_class,
  third_class
) => {
  return trainModel.createTrain(
    train_id,
    route_id,
    train_name,
    no_of_boxes,
    passenger_capacity,
    first_class,
    second_class,
    third_class
  );
};

const updateTrain = async (id, updates) => {
  return trainModel.updateTrain(id, updates);
};

module.exports = {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
};
