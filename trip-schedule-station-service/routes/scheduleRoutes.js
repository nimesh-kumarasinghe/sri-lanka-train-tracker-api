const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

router.get("/schedules", scheduleController.getAllSchedules);
router.get("/schedules/:id", scheduleController.getScheduleById);
router.post("/schedules", scheduleController.createSchedule);
router.put("/schedules/:id", scheduleController.updateSchedule);
router.delete("/schedules/:id", scheduleController.deleteSchedule);
router.get("/schedules/trip/:id", scheduleController.getScheduleByTripId);

module.exports = router;
