const express = require("express");
const router = express.Router();
const tripStationAssignController = require("../controllers/tripStationAssignController");

router.get("/trip-stations", tripStationAssignController.getAllTripStations);
router.get(
  "/trip-stations/:id",
  tripStationAssignController.getStationByTripId
);
router.post("/trip-stations", tripStationAssignController.assignStation);

module.exports = router;
