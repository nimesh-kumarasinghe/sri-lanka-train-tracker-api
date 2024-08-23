const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

router.get("/schedules", scheduleController.getAllSchedules);
router.get("/schedules/:id", scheduleController.getScheduleById);

module.exports = router;
