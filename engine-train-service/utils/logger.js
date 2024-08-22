const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/app.log");

const log = (message) => {
  const time = new Date().toISOString();
  const logMessage = `[${time}] ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
};

module.exports = log;
