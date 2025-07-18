const scheduleService = require("../services/scheduleService");

// get all schedule details
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedules();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Data retrieving failed" });
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
    res.status(500).json({ message: "Data retrieving failed" });
  }
};

// get availability, start time and end time details by trip id
const getScheduleByTripId = async (req, res) => {
  const { id } = req.params;
  try {
    const scheduleTrip = await scheduleService.getScheduleByTripId(id);
    if (scheduleTrip) {
      res.json(scheduleTrip);
    } else {
      res.status(404).json({ message: "Schedule not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Data retrieving failed" });
  }
};

// create a schedule
const createSchedule = async (req, res) => {
  const { trip_id, availability, start_time, end_time } = req.body;
  try {
    const newSchedule = await scheduleService.createSchedule(
      trip_id,
      availability,
      start_time,
      end_time
    );
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ message: "Data insertion failed" });
  }
};

// update schedule details
const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updateSchedule = await scheduleService.updateSchedule(id, updates);
    if (updateSchedule) {
      res.json(updateSchedule);
    } else {
      res.status(404).json({ message: "Schedule not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Data update failed" });
  }
};

// delete a schedule
const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await scheduleService.deleteSchedule(id);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Schedule deleted successfully" });
    } else {
      res.status(404).json({ message: "Schedule not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Data delete failed" });
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleByTripId,
};
