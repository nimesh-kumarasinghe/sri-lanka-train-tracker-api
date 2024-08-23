const { pool } = require("../config/dbConfig");

// get all trip details
const getAllTrips = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM trip");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get trip details by id
const getTripById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM trip WHERE trip_id = ?", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllTrips,
  getTripById,
};
