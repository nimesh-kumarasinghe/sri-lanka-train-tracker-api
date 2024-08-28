const express = require("express");
const {
  processData,
  getAllTrainGpsData,
} = require("../controllers/dataController");

const router = express.Router();

router.post("/locations", processData);
router.get("/gps-data", getAllTrainGpsData);

module.exports = router;
