const engineModel = require("../models/engineModel");

// get all engine details
const getAllEngines = async () => {
  return engineModel.getAllEngines();
};

// get engine details by id
const getEngineById = async (id) => {
  return engineModel.getEngineById(id);
};

// get train id details by iot id
const getTrainByIotid = async (id) => {
  return engineModel.getTrainByIotid(id);
};

// create a engine
const createEngine = async (
  engine_id,
  iotdevice_id,
  train_id,
  engine_class,
  manufacturer_year,
  engine_type,
  fuel_type,
  horsepower,
  torque_nm,
  cylinders,
  weight_kg
) => {
  return engineModel.createEngine(
    engine_id,
    iotdevice_id,
    train_id,
    engine_class,
    manufacturer_year,
    engine_type,
    fuel_type,
    horsepower,
    torque_nm,
    cylinders,
    weight_kg
  );
};

// update engine details
const updateEngine = async (id, updates) => {
  return engineModel.updateEngine(id, updates);
};

// delete a engine
const deleteEngine = async (id) => {
  return engineModel.deleteEngine(id);
};

module.exports = {
  getAllEngines,
  getEngineById,
  createEngine,
  updateEngine,
  deleteEngine,
  getTrainByIotid,
};
