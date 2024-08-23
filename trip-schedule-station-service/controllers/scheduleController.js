const scheduleService = require("../services/scheduleService");

// get all schedule details
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedules();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get schedule details by id
const getScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await scheduleService.getScheduleById(id);
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ message: "Schedule not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
};
