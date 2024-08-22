const engineModel = require("../models/engineModel");

// get all engine details
const getAllEngines = async () => {
  return engineModel.getAllEngines();
};

// get engine details by id
const getEngineById = async (id) => {
  return engineModel.getEngineById(id);
};

module.exports = {
  getAllEngines,
  getEngineById,
};
