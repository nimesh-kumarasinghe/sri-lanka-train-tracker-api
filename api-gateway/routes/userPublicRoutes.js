const express = require("express");
const router = express.Router();
const apiGatewayController = require("../controllers/apiGatewayController");

router.post("/register", apiGatewayController.register);
router.post("/login", apiGatewayController.login);

module.exports = router;
