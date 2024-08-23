const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Public Routes
const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

// Protected Routes
const trainRoutes = require("./trainRoutes");
// const tripScheduleRoutes = require("./tripScheduleRoutes");
// const lineRouteRoutes = require("./lineRouteRoutes");
router.use("/trains", authMiddleware.verifyToken, trainRoutes);
// router.use("/trip-schedule", authMiddleware.verifyToken, tripScheduleRoutes);
// router.use("/line-route", authMiddleware.verifyToken, lineRouteRoutes);

module.exports = router;
