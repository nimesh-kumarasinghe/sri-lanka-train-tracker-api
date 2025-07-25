const jwt = require("jsonwebtoken");
const { authConfig } = require("../config/gatewayConfig"); // Update with your actual path

// Generate a JWT token
const generateToken = (user_id, role) => {
  return jwt.sign({ user_id, role }, authConfig.secret, { expiresIn: "1h" });
};

const generatePublicToken = () => {
  const payload = {
    purpose: "public_access",
  };
  return jwt.sign(payload, authConfig.secret, { expiresIn: "1h" });
};

module.exports = {
  generateToken,
  generatePublicToken,
};
