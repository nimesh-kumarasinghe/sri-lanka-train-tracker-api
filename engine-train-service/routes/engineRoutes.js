const express = require("express");
const router = express.Router();
const engineController = require("../controllers/engineController");

router.get("/engines", engineController.getAllEngines);
router.get("/engines/:id", engineController.getEngineById);
router.post("/engines", engineController.createEngine);
router.put("/engines/:id", engineController.updateEngine);
router.delete("/engines/:id", engineController.deleteEngine);
router.get("/engine-trains/:id", engineController.getTrainByIotid);

module.exports = router;
