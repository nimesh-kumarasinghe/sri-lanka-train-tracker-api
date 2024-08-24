const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post("/data", locationController.updateLocation);

router.get("/v1/trains/data", locationController.getAllLocations);

module.exports = router;
