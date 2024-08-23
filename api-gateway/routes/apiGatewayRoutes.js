const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Public Routes
const userRoutes = require("./userPublicRoutes");
router.use("/", userRoutes);

// Protected Routes
const userPrivateRoutes = require("./userPrivateRoutes");
const trainRoutes = require("./trainRoutes");
const engineRoutes = require("./engineRoutes");
const stationRoutes = require("./stationRoutes");
const tripRoutes = require("./tripRoutes");
const scheduleRoutes = require("./scheduleRoutes");
const assignStationRoutes = require("./assignStationRoutes");
// const tripScheduleRoutes = require("./tripScheduleRoutes");
// const lineRouteRoutes = require("./lineRouteRoutes");

router.use("/users", authMiddleware.verifyToken, userPrivateRoutes);
router.use("/trains", authMiddleware.verifyToken, trainRoutes);
router.use("/engines", authMiddleware.verifyToken, engineRoutes);
router.use("/stations", authMiddleware.verifyToken, stationRoutes);
router.use("/trips", authMiddleware.verifyToken, tripRoutes);
router.use("/schedules", authMiddleware.verifyToken, scheduleRoutes);
router.use("/trip-stations", authMiddleware.verifyToken, assignStationRoutes);
// router.use("/trip-schedule", authMiddleware.verifyToken, tripScheduleRoutes);
// router.use("/line-route", authMiddleware.verifyToken, lineRouteRoutes);

module.exports = router;
