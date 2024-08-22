const engineModel = require("../models/engineModel");

// get all engine details
const getAllEngines = async () => {
  return engineModel.getAllEngines();
};

module.exports = {
  getAllEngines,
};
