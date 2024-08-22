const lineService = require("../services/lineService");

// get all line details
const getAllLines = async (req, res) => {
  try {
    const lines = await lineService.getAllLines();
    res.json(lines);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get line details by id
const getLineById = async (req, res) => {
  const { id } = req.params;
  try {
    const line = await lineService.getLineById(id);
    if (line) {
      res.json(line);
    } else {
      res.status(404).json({ message: "Line not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// create a line
const createLine = async (req, res) => {
  const { line_id, line_name } = req.body;
  try {
    const newLine = await lineService.createLine(line_id, line_name);
    res.status(201).json(newLine);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllLines,
  getLineById,
  createLine,
};
