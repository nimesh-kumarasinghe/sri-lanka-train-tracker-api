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

// assign a station for a trip
const assignStation = async (
  trip_id,
  station_id,
  arrival_time,
  departure_time
) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO trip_station(trip_id, station_id, arrival_time, departure_time) VALUES (?, ?, ?, ?)",
      [trip_id, station_id, arrival_time, departure_time]
    );
    return {
      trip_id: result.trip_id,
      trip_id,
      station_id,
      arrival_time,
      departure_time,
    };
  } catch (err) {
    throw err;
  }
};

// update a assigned station for a trip
const updateAssignStation = async (id, updates) => {
  try {
    const [result] = await pool.query(
      "UPDATE trip_station SET ? WHERE id = ?",
      [updates, id]
    );
    if (result.affectedRows === 0) return null;
    return { message: "Station updated successfully" };
  } catch (err) {
    throw err;
  }
};

// delete a assigned station for a trip
const deleteAssignStation = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM trip_station WHERE id = ?", [
      id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllTripStations,
  getStationByTripId,
  assignStation,
  updateAssignStation,
  deleteAssignStation,
};
