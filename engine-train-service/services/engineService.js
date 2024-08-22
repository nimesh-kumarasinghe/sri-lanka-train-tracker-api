const engineModel = require("../models/engineModel");

// get all engine details
const getAllEngines = async () => {
  return engineModel.getAllEngines();
};

// get engine details by id
const getEngineById = async (id) => {
  return engineModel.getEngineById(id);
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

module.exports = {
  getAllEngines,
  getEngineById,
  createEngine,
};
