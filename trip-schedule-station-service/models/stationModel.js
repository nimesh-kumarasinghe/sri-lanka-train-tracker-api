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

// create a station
const createStation = async (station_id, station_name, latitude, longitude) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO station(station_id, station_name, latitude, longitude) VALUES (?, ?, ?, ?)",
      [station_id, station_name, latitude, longitude]
    );
    return {
      station_id: result.station_id,
      station_id,
      station_name,
      latitude,
      longitude,
    };
  } catch (err) {
    throw err;
  }
};

// update station details
const updateStation = async (id, updates) => {
  try {
    const [result] = await pool.query(
      "UPDATE station SET ? WHERE station_id = ?",
      [updates, id]
    );
    if (result.affectedRows === 0) return null;
    return getStationById(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
};
