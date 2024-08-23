const express = require("express");
const router = express.Router();
const stationController = require("../controllers/stationController");

router.get("/stations", stationController.getAllStations);
router.get("/stations/:id", stationController.getStationById);

module.exports = router;
