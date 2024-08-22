const trainService = require("../services/trainService");

// get all train details
const getAllTrains = async (req, res) => {
  try {
    const trains = await trainService.getAllTrains();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get train details by id
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

// create a train
const createTrain = async (req, res) => {
  const {
    train_id,
    route_id,
    train_name,
    no_of_boxes,
    passenger_capacity,
    first_class,
    second_class,
    third_class,
  } = req.body;
  try {
    const newTrain = await trainService.createTrain(
      train_id,
      route_id,
      train_name,
      no_of_boxes,
      passenger_capacity,
      first_class,
      second_class,
      third_class
    );
    res.status(201).json(newTrain);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// update train details
const updateTrain = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedTrain = await trainService.updateTrain(id, updates);
    if (updatedTrain) {
      res.json(updatedTrain);
    } else {
      res.status(404).json({ message: "Train not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// delete a train
const deleteTrain = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await trainService.deleteTrain(id);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Train deleted successfully" });
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
  createTrain,
  updateTrain,
  deleteTrain,
};
