const scheduleModel = require("../models/scheduleModel");

// get all schedule details
const getAllSchedules = async () => {
  return scheduleModel.getAllSchedules();
};

// get schedule details by id
const getScheduleById = async (id) => {
  return scheduleModel.getScheduleById(id);
};

module.exports = {
  getAllSchedules,
  getScheduleById,
};
