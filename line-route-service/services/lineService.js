const lineModel = require("../models/lineModel");

// get all line details
const getAllLines = async () => {
  return lineModel.getAllLines();
};

// get line details by id
const getLineById = async (id) => {
  return lineModel.getLineById(id);
};

module.exports = {
  getAllLines,
  getLineById,
};
