const { pool } = require("../config/dbConfig");

const getAllTrains = async () => {
  const [rows] = await pool.query("SELECT * FROM train");
  return rows;
};

const getTrainById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM train WHERE train_id = ?", [
    id,
  ]);
  return rows[0];
};

const createTrain = async (
  train_id,
  route_id,
  train_name,
  no_of_boxes,
  passenger_capacity,
  first_class,
  second_class,
  third_class
) => {
  const [result] = await pool.query(
    "INSERT INTO train (train_id, route_id, train_name, no_of_boxes, passenger_capacity, first_class, second_class, third_class) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      train_id,
      route_id,
      train_name,
      no_of_boxes,
      passenger_capacity,
      first_class,
      second_class,
      third_class,
    ]
  );
  return {
    train_id: result.train_id,
    route_id,
    train_name,
    no_of_boxes,
    passenger_capacity,
    first_class,
    second_class,
    third_class,
  };
};

module.exports = {
  getAllTrains,
  getTrainById,
  createTrain,
};
