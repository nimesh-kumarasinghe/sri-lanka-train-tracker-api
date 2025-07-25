const { pool } = require("../config/dbConfig");

// get all route details
const getAllRoutes = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM route");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get route details by id
const getRouteById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM route WHERE route_id = ?", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

// create a route
const createRoute = async (
  route_code,
  start_station,
  end_station,
  distance
) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO route(`route_code`, `start_station`, `end_station`, `distance`) VALUES (?, ?, ?, ?)",
      [route_code, start_station, end_station, distance]
    );
    return {
      id: result.route_id,
      route_code,
      start_station,
      end_station,
      distance,
    };
  } catch (err) {
    throw err;
  }
};

// update route details
const updateRoute = async (id, updates) => {
  try {
    const [result] = await pool.query("UPDATE route SET ? WHERE route_id = ?", [
      updates,
      id,
    ]);
    if (result.affectedRows === 0) return null;
    return getRouteById(id);
  } catch (err) {
    throw err;
  }
};

// delete a route
const deleteRoute = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM route WHERE route_id = ?", [
      id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
};
