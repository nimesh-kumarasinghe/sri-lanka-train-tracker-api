const { pool } = require("../config/dbConfig");

// get all engine details
const getAllEngines = async () => {
  const [rows] = await pool.query("SELECT * FROM engine");
  return rows;
};

// get engine details by id
const getEngineById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM engine WHERE engine_id = ?", [
    id,
  ]);
  return rows[0];
};

module.exports = {
  getAllEngines,
  getEngineById,
};
