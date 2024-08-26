const authService = require("../services/authService");

const generateToken = (req, res) => {
  const token = authService.generatePublicToken(); // You can pass dummy user_id and role
  res.status(200).json({ token });
};

module.exports = {
  generateToken,
};
