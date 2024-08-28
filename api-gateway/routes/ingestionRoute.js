const express = require("express");
const router = express.Router();
const ingestionController = require("../controllers/ingestionController");

router.get("/", ingestionController.getAllTrainGpsData);

module.exports = router;
