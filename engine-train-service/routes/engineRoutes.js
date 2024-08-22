const express = require("express");
const router = express.Router();
const engineController = require("../controllers/engineController");

router.get("/engines", engineController.getAllEngines);
router.get("/engines/:id", engineController.getEngineById);
router.post("/engines", engineController.createEngine);

module.exports = router;
