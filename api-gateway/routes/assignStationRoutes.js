const express = require("express");
const router = express.Router();
const assignStationController = require("../controllers/assignStationController");

router.get("/", assignStationController.getAllTripStations);
router.get("/:id", assignStationController.getStationByTripId);
router.post("/", assignStationController.assignStation);
router.put("/:id", assignStationController.updateAssignStation);
router.delete("/:id", assignStationController.deleteAssignStation);

module.exports = router;
