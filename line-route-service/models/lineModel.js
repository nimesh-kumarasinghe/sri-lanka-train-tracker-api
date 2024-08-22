const { pool } = require("../config/dbConfig");

// get all line details
const getAllLines = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM line");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get line details by id
const getLineById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM line WHERE line_id = ?", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllLines,
  getLineById,
};
