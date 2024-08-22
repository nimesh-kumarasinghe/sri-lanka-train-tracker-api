const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");

router.get("/trains", trainController.getAllTrains);

module.exports = router;
