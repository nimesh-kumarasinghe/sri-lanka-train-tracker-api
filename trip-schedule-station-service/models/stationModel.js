const { pool } = require("../config/dbConfig");

// get all station details
const getAllStations = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM station");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get station details by id
const getStationById = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM station WHERE station_id = ?",
      [id]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllStations,
  getStationById,
};
