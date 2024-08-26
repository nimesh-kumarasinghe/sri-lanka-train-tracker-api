const express = require("express");
const router = express.Router();
const trainDataController = require("../controllers/trainDataController");

router.get("/", trainDataController.getAllTrainData);
router.get("/by-stations", trainDataController.getTrainDataByStations);

module.exports = router;
