const express = require("express");
const morgan = require("morgan");
const { connectToDatabase } = require("./config/dbConfig");
const tripRoutes = require("./routes/tripRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const stationRoutes = require("./routes/stationRoutes");
const tripStationAssignRoutes = require("./routes/tripStationAssignRoutes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("combined"));

app.use(
  "/api",
  tripRoutes,
  scheduleRoutes,
  stationRoutes,
  tripStationAssignRoutes
);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Trip Route Service running on port ${PORT}`);
});
