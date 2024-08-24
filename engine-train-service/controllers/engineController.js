const engineService = require("../services/engineService");

// get all engine details
const getAllEngines = async (req, res) => {
  try {
    const engines = await engineService.getAllEngines();
    res.json(engines);
  } catch (err) {
    res.status(500).json({ message: "Data retrieving failed" });
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
    res.status(500).json({ message: "Data retrieving failed" });
  }
};

// get train id details by iot id
const getTrainByIotid = async (req, res) => {
  const { id } = req.params;
  try {
    const train = await engineService.getTrainByIotid(id);
    if (train) {
      res.json(train);
    } else {
      res.status(404).json({ message: "Train ID not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Data retrieving failed" });
  }
};

// create a engine
const createEngine = async (req, res) => {
  const {
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
    weight_kg,
  } = req.body;
  try {
    const newEngine = await engineService.createEngine(
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
    res.status(201).json(newEngine);
  } catch (err) {
    res.status(500).json({ message: "Data insertion failed" });
  }
};

// update engine details
const updateEngine = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updateEngine = await engineService.updateEngine(id, updates);
    if (updateEngine) {
      res.json(updateEngine);
    } else {
      res.status(404).json({ message: "Engine not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Data update failed" });
  }
};

// delete a engine
const deleteEngine = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await engineService.deleteEngine(id);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Engine deleted successfully" });
    } else {
      res.status(404).json({ message: "Engine not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Data delete failed" });
  }
};

module.exports = {
  getAllEngines,
  getEngineById,
  createEngine,
  updateEngine,
  deleteEngine,
  getTrainByIotid,
};
