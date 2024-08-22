const trainService = require("../services/trainService");

const getAllTrains = async (req, res) => {
  try {
    const trains = await trainService.getAllTrains();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllTrains,
};
