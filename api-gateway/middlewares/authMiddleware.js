const jwt = require("jsonwebtoken");
const config = require("../config/gatewayConfig").authConfig;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded; // Save decoded info for use in other routes
    next();
  });
};

module.exports = {
  verifyToken,
};
