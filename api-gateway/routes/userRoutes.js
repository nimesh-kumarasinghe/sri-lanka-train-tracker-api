const express = require("express");
const router = express.Router();
const apiGatewayController = require("../controllers/apiGatewayController");

router.post("/register", apiGatewayController.register);
router.post("/login", apiGatewayController.login);

router.get("/:id", apiGatewayController.getUser);
router.put("/:id", apiGatewayController.updateUser);
router.delete("/:id", apiGatewayController.deleteUser);

module.exports = router;
