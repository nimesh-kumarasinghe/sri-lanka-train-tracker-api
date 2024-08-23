const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { comparePassword } = require("../utils/encryptionUtils");
const { JWT_SECRET, JWT_EXPIRATION } = require("../config/authConfig");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

// create a user
const register = async (user_id, password, role) => {
  //password = await hashPassword(password);
  return userModel.register(user_id, password, role);
};

// login
const loginUser = async (user_id, password) => {
  const user = await userModel.getUserByUsername(user_id);
  if (!user) return null;
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) return null;
  const token = generateToken(user);
  return { token, role: user.role };
};

// get user by id
const getUserById = async (id) => {
  return userModel.getUserById(id);
};

// update user data
const updateUser = async (id, updates) => {
  if (updates.password) {
    updates.password = await hashPassword(updates.password);
  }
  return userModel.updateUser(id, updates);
};

// delete a user
const deleteUser = async (id) => {
  return userModel.deleteUser(id);
};

module.exports = {
  register,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  generateToken,
};
