const express = require("express");
const { processData } = require("../controllers/dataController");

const router = express.Router();

router.post("/receive", processData);

module.exports = router;
