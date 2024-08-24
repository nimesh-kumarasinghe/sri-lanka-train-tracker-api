const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post("/data", locationController.updateLocation);

router.get("/v1/trains/summary", locationController.getAllTrainData);

module.exports = router;
