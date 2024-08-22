const lineModel = require("../models/lineModel");

// get all line details
const getAllLines = async () => {
  return lineModel.getAllLines();
};

module.exports = {
  getAllLines,
};
