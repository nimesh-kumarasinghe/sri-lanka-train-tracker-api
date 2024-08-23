require("dotenv").config();

const authConfig = {
  secret: process.env.JWT_SECRET,
};

const userServiceUrl = process.env.USER_SERVICE_URL;
const engineTrainServiceUrl = process.env.ENGINE_TRAIN_SERVICE_URL;
const tripScheduleServiceUrl = process.env.TRIP_SCHEDULE_SERVICE_URL;
const lineRouteServiceUrl = process.env.LINE_ROUTE_SERVICE_URL;

module.exports = {
  authConfig,
  userServiceUrl,
  engineTrainServiceUrl,
  tripScheduleServiceUrl,
  lineRouteServiceUrl,
};
