const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController");

router.get("/lines", lineController.getAllLines);

module.exports = router;
