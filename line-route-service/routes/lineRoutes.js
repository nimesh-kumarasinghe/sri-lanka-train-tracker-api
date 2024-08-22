const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController");

router.get("/lines", lineController.getAllLines);
router.get("/lines/:id", lineController.getLineById);

module.exports = router;
