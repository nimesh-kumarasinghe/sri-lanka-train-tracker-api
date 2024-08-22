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

module.exports = {
  getAllLines,
};
