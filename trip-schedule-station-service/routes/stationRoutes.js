const express = require("express");
const router = express.Router();
const stationController = require("../controllers/stationController");

router.get("/stations", stationController.getAllStations);
router.get("/stations/:id", stationController.getStationById);
router.post("/stations", stationController.createStation);
router.put("/stations/:id", stationController.updateStation);

module.exports = router;
