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

// get engine details by id
const getEngineById = async (req, res) => {
  const { id } = req.params;
  try {
    const engine = await engineService.getEngineById(id);
    if (engine) {
      res.json(engine);
    } else {
      res.status(404).json({ message: "Engine not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllEngines,
  getEngineById,
};
