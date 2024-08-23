// src/server.js
const express = require("express");
const morgan = require("morgan");
const apiGatewayRoutes = require("./routes/apiGatewayRoutes");
//const { setupLogging } = require("./config/gatewayConfig");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan(process.env.LOG_LEVEL || "combined")); // Logging

//setupLogging(); // Custom logging setup

app.use("/api", apiGatewayRoutes);

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
