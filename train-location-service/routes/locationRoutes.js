const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post("/data", locationController.updateLocation);

router.get("/v1/trains/summary", locationController.getAllTrainData);
router.get(
  "/v1/trains/summary/by-stations",
  locationController.getTrainDataByStations
);

module.exports = router;
