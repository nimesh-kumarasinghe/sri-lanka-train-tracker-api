const express = require("express");
const router = express.Router();
const apiGatewayController = require("../controllers/apiGatewayController");

// router.get("/engines", apiGatewayController.getAllEngines);
// router.get("/engines/:id", apiGatewayController.getEngineById);
// router.post("/engines", apiGatewayController.createEngine);
// router.put("/engines/:id", apiGatewayController.updateEngine);
// router.delete("/engines/:id", apiGatewayController.deleteEngine);

router.get("/trains", apiGatewayController.getAllTrains);
//router.get("/trains/:id", apiGatewayController.getTrainById);
router.post("/trains", apiGatewayController.createTrain);
//router.put("/trains/:id", apiGatewayController.updateTrain);
//router.delete("/trains/:id", apiGatewayController.deleteTrain);

module.exports = router;
