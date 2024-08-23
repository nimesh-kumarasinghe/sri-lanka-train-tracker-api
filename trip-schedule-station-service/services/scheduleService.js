const scheduleModel = require("../models/scheduleModel");

// get all schedule details
const getAllSchedules = async () => {
  return scheduleModel.getAllSchedules();
};

// get schedule details by id
const getScheduleById = async (id) => {
  return scheduleModel.getScheduleById(id);
};

// create a schedule
const createSchedule = async (trip_id, availability, start_time, end_time) => {
  return scheduleModel.createSchedule(
    trip_id,
    availability,
    start_time,
    end_time
  );
};

// update schedule details
const updateSchedule = async (id, updates) => {
  return scheduleModel.updateSchedule(id, updates);
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
};
