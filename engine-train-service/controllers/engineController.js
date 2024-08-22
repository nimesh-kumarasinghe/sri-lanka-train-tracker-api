const engineService = require("../services/engineService");

// get all engine details
const getAllEngines = async (req, res) => {
  try {
    const engines = await engineService.getAllEngines();
    res.json(engines);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllEngines,
};
