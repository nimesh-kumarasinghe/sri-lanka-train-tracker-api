const trainModel = require("../models/trainModel");

// get all train details
const getAllTrains = async () => {
  return trainModel.getAllTrains();
};

// get train details by id
const getTrainById = async (id) => {
  return trainModel.getTrainById(id);
};

// create a train
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

// update train details
const updateTrain = async (id, updates) => {
  return trainModel.updateTrain(id, updates);
};

// delete a train
const deleteTrain = async (id) => {
  return trainModel.deleteTrain(id);
};

module.exports = {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
};
