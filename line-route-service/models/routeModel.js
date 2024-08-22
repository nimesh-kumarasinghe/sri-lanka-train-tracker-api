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

module.exports = {
  getAllRoutes,
  getRouteById,
};
