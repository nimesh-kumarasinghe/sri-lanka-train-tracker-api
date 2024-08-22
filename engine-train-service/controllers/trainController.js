const trainService = require("../services/trainService");

const getAllTrains = async (req, res) => {
  try {
    const trains = await trainService.getAllTrains();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getTrainById = async (req, res) => {
  const { id } = req.params;
  try {
    const train = await trainService.getTrainById(id);
    if (train) {
      res.json(train);
    } else {
      res.status(404).json({ message: "Train not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllTrains,
  getTrainById,
};
