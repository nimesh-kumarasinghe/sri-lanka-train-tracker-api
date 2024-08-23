const express = require("express");
const router = express.Router();
const apiGatewayController = require("../controllers/apiGatewayController");

router.get("/", apiGatewayController.getAllTrains);
//router.get("/trains/:id", apiGatewayController.getTrainById);
router.post("/trains", apiGatewayController.createTrain);
//router.put("/trains/:id", apiGatewayController.updateTrain);
//router.delete("/trains/:id", apiGatewayController.deleteTrain);

module.exports = router;
