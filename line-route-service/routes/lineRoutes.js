const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController");

router.get("/lines", lineController.getAllLines);
router.get("/lines/:id", lineController.getLineById);
router.post("/lines", lineController.createLine);
router.put("/lines/:id", lineController.updateLine);
router.delete("/lines/:id", lineController.deleteLine);

module.exports = router;
