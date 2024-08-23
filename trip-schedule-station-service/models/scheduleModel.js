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

// create a schedule
const createSchedule = async (trip_id, availability, start_time, end_time) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO schedule(trip_id, availability, start_time, end_time) VALUES (?, ?, ?, ?)",
      [trip_id, availability, start_time, end_time]
    );
    return {
      schedule_id: result.schedule_id,
      trip_id,
      availability,
      start_time,
      end_time,
    };
  } catch (err) {
    throw err;
  }
};

// update schedule details
const updateSchedule = async (id, updates) => {
  try {
    const [result] = await pool.query(
      "UPDATE schedule SET ? WHERE schedule_id = ?",
      [updates, id]
    );
    if (result.affectedRows === 0) return null;
    return getScheduleById(id);
  } catch (err) {
    throw err;
  }
};

// delete a schedule
const deleteSchedule = async (id) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM schedule WHERE schedule_id = ?",
      [id]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
