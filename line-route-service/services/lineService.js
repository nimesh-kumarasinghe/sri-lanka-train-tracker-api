const lineModel = require("../models/lineModel");

// get all line details
const getAllLines = async () => {
  return lineModel.getAllLines();
};

// get line details by id
const getLineById = async (id) => {
  return lineModel.getLineById(id);
};

// create a line
const createLine = async (line_id, line_name) => {
  return lineModel.createLine(line_id, line_name);
};

module.exports = {
  getAllLines,
  getLineById,
  createLine,
};
