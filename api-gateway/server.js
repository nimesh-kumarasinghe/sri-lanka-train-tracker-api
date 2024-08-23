const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const apiGatewayRoutes = require("./routes/apiGatewayRoutes");
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

// log requests to the console and to the log file
app.use(morgan(process.env.LOG_LEVEL, { stream: accessLogStream })); // Log file
app.use(morgan(process.env.LOG_LEVEL)); // Log console

app.use("/api", apiGatewayRoutes);

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
