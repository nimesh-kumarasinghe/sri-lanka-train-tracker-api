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

module.exports = {
  getAllTrains,
  getTrainById,
};
