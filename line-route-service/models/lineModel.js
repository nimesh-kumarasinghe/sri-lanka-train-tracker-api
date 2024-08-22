const { pool } = require("../config/dbConfig");

// get all line details
const getAllLines = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM line");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get line details by id
const getLineById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM line WHERE line_id = ?", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

// create a line
const createLine = async (line_id, line_name) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO line(line_id, line_name) VALUES (?, ?)",
      [line_id, line_name]
    );
    return {
      line_id: result.line_id,
      line_name,
    };
  } catch (err) {
    throw err;
  }
};

// update line details
const updateLine = async (id, updates) => {
  try {
    const [result] = await pool.query("UPDATE line SET ? WHERE line_id = ?", [
      updates,
      id,
    ]);
    if (result.affectedRows === 0) return null;
    return getLineById(id);
  } catch (err) {
    throw err;
  }
};

// delete a line
const deleteLine = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM line WHERE line_id = ?", [
      id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllLines,
  getLineById,
  createLine,
  updateLine,
  deleteLine,
};
