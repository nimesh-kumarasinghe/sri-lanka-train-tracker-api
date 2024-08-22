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

module.exports = {
  getAllLines,
};
