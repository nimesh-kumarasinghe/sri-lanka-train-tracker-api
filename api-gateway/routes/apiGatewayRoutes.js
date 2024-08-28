const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Public Routes
const userRoutes = require("./userPublicRoutes");
const authController = require("../controllers/authController");
router.use("/", userRoutes);
router.get("/generate-token", authController.generateToken);

// Protected Routes
const userPrivateRoutes = require("./userPrivateRoutes");
const trainRoutes = require("./trainRoutes");
const engineRoutes = require("./engineRoutes");
const stationRoutes = require("./stationRoutes");
const tripRoutes = require("./tripRoutes");
const scheduleRoutes = require("./scheduleRoutes");
const assignStationRoutes = require("./assignStationRoutes");
const lineRoutes = require("./lineRoutes");
const routeRoutes = require("./routeRoutes");
const ingestionRoute = require("./ingestionRoute");
const trainDataRoutes = require("./trainDataRoutes");

router.use("/users", authMiddleware.verifyToken, userPrivateRoutes);
router.use("/trains", authMiddleware.verifyToken, trainRoutes);
router.use("/engines", authMiddleware.verifyToken, engineRoutes);
router.use("/stations", authMiddleware.verifyToken, stationRoutes);
router.use("/trips", authMiddleware.verifyToken, tripRoutes);
router.use("/schedules", authMiddleware.verifyToken, scheduleRoutes);
router.use("/trip-stations", authMiddleware.verifyToken, assignStationRoutes);
router.use("/lines", authMiddleware.verifyToken, lineRoutes);
router.use("/routes", authMiddleware.verifyToken, routeRoutes);
router.use("/gps-data", authMiddleware.verifyToken, ingestionRoute);
router.use("/v1/trains/summary", authMiddleware.verifyToken, trainDataRoutes);

module.exports = router;
