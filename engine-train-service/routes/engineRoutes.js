const express = require("express");
const router = express.Router();
const engineController = require("../controllers/engineController");

router.get("/engines", engineController.getAllEngines);

module.exports = router;
