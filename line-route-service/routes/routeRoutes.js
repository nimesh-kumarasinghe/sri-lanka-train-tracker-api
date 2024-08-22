const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");

router.get("/routes", routeController.getAllRoutes);
router.get("/routes/:id", routeController.getRouteById);
router.post("/routes", routeController.createRoute);
router.put("/routes/:id", routeController.updateRoute);
router.delete("/routes/:id", routeController.deleteRoute);

module.exports = router;
