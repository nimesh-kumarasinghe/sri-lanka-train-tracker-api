const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post("/data", locationController.updateLocation);

router.get("/locations", locationController.getAllLocations);

module.exports = router;
