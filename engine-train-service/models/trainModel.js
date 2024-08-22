const { pool } = require("../config/dbConfig");

// get all train details
const getAllTrains = async () => {
  const [rows] = await pool.query("SELECT * FROM train");
  return rows;
};

// get train details by id
const getTrainById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM train WHERE train_id = ?", [
    id,
  ]);
  return rows[0];
};

// create a train
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

// update train details
const updateTrain = async (id, updates) => {
  const [result] = await pool.query("UPDATE train SET ? WHERE train_id = ?", [
    updates,
    id,
  ]);
  if (result.affectedRows === 0) return null;
  return getTrainById(id);
};

// delete a train
const deleteTrain = async (id) => {
  const [result] = await pool.query("DELETE FROM train WHERE train_id = ?", [
    id,
  ]);
  return result;
};

module.exports = {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
};
