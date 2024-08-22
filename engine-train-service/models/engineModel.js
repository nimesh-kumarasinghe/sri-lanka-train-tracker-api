const { pool } = require("../config/dbConfig");

// get all engine details
const getAllEngines = async () => {
  const [rows] = await pool.query("SELECT * FROM engine");
  return rows;
};

module.exports = {
  getAllEngines,
};
