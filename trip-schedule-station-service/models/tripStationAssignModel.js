const { pool } = require("../config/dbConfig");

// get all stations details
const getAllTripStations = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM trip_station");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get station details by trip id
const getStationByTripId = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM `trip_station` WHERE trip_id = ?",
      [id]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllTripStations,
  getStationByTripId,
};
