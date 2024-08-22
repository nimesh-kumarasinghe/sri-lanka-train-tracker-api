const { pool } = require("../config/dbConfig");

// get all train details
const getAllTrains = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM train");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get train details by id
const getTrainById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM train WHERE train_id = ?", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    throw err;
  }
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
  try {
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
  } catch (err) {
    throw err;
  }
};

// update train details
const updateTrain = async (id, updates) => {
  try {
    const [result] = await pool.query("UPDATE train SET ? WHERE train_id = ?", [
      updates,
      id,
    ]);
    if (result.affectedRows === 0) return null;
    return getTrainById(id);
  } catch (err) {
    throw err;
  }
};

// delete a train
const deleteTrain = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM train WHERE train_id = ?", [
      id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
};
