const authService = require("../services/authService");
const userModel = require("../models/userModel");
const encryptionUtils = require("../utils/encryptionUtils");

const register = async (req, res) => {
  try {
    const { user_id, password, role } = req.body;
    const hashedPassword = await encryptionUtils.hashPassword(password);
    const result = await userModel.createUser({
      user_id,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: result });
  } catch (err) {
    //console.error("Register Error:", err); // Log the error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const user = await userModel.getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await encryptionUtils.comparePassword(
      password,
      user.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = authService.generateToken(user.user_id, user.role);
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    //console.error("Login Error:", err); // Log the error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await authService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await authService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const affectedRows = await authService.deleteUser(req.params.id);
    if (affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
};
