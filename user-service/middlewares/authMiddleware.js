const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/authConfig");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Failed to authenticate token" });
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
