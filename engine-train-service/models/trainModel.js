const { pool } = require("../config/dbConfig");

const getAllTrains = async () => {
  const [rows] = await pool.query("SELECT * FROM train");
  return rows;
};

module.exports = {
  getAllTrains,
};
