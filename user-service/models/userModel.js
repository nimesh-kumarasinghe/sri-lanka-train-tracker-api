const pool = require("../config/dbConfig");

const createUser = async ({ user_id, password, role }) => {
  const [result] = await pool.query(
    "INSERT INTO users (user_id, password, role) VALUES (?, ?, ?)",
    [user_id, password, role]
  );
  return result;
};

const getUserById = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
    user_id,
  ]);
  return rows[0];
};

const getUserByUsername = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
    user_id,
  ]);
  return rows[0];
};

const updateUser = async (id, updates) => {
  const [result] = await pool.query("UPDATE users SET ? WHERE user_id = ?", [
    updates,
    id,
  ]);
  if (result.affectedRows === 0) return null;
  return getUserById(id);
};

const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [
    id,
  ]);
  return result.affectedRows;
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
};
