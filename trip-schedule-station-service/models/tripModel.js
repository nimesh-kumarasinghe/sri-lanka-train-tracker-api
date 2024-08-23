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

// create a trip
const createTrip = async (
  trip_id,
  route_id,
  train_id,
  trip_type,
  duration,
  max_speed_kmh
) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO trip(trip_id, route_id, train_id, trip_type, duration, max_speed_kmh) VALUES (?,?,?,?,?,?)",
      [trip_id, route_id, train_id, trip_type, duration, max_speed_kmh]
    );
    return {
      trip_id: result.trip_id,
      trip_id,
      route_id,
      train_id,
      trip_type,
      duration,
      max_speed_kmh,
    };
  } catch (err) {
    throw err;
  }
};

// update trip details
const updateTrip = async (id, updates) => {
  try {
    const [result] = await pool.query("UPDATE trip SET ? WHERE trip_id = ?", [
      updates,
      id,
    ]);
    if (result.affectedRows === 0) return null;
    return getTripById(id);
  } catch (err) {
    throw err;
  }
};

// delete a trip
const deleteTrip = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM trip WHERE trip_id = ?", [
      id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};
