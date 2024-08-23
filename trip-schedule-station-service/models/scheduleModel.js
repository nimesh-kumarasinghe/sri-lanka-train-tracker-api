const { pool } = require("../config/dbConfig");

// get all schedule details
const getAllSchedules = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM schedule");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get schedule details by id
const getScheduleById = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM schedule WHERE schedule_id = ?",
      [id]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
};
