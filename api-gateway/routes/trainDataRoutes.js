const express = require("express");
const router = express.Router();
const trainDataController = require("../controllers/trainDataController");

router.get("/", trainDataController.getAllTrainData);

module.exports = router;
