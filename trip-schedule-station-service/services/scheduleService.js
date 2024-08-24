const scheduleModel = require("../models/scheduleModel");

// get all schedule details
const getAllSchedules = async () => {
  return scheduleModel.getAllSchedules();
};

// get schedule details by id
const getScheduleById = async (id) => {
  return scheduleModel.getScheduleById(id);
};

// get availability, start time and end time details by trip id
const getScheduleByTripId = async (id) => {
  return scheduleModel.getScheduleByTripId(id);
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

// delete a schedule
const deleteSchedule = async (id) => {
  return scheduleModel.deleteSchedule(id);
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleByTripId,
};
