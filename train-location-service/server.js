const express = require("express");
const connectDB = require("./config/mongoConfig");
const locationRoutes = require("./routes/locationRoutes");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// ensure the logs directory exists
const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// write stream for logging to a file
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "app.log"),
  { flags: "a" }
);

app.use(express.json());

connectDB();

// log requests to the console and to the log file
app.use(morgan(process.env.LOG_LEVEL, { stream: accessLogStream })); // Log file
app.use(morgan(process.env.LOG_LEVEL)); // Log console

app.use("/api", locationRoutes);

app.listen(PORT, () => {
  console.log(`Location Service running on port ${PORT}`);
});
