const express = require("express");
const morgan = require("morgan");
const trainRoutes = require("./routes/trainRoutes");
const engineRoutes = require("./routes/engineRoutes");
const { connectToDatabase } = require("./config/dbConfig");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

const log = require("./utils/logger");

app.use(express.json());
app.use(morgan("combined"));

app.use("/api", trainRoutes, engineRoutes);

connectToDatabase();

app.listen(PORT, () => {
  log(`Engine Train Service running on port ${PORT}`);
  console.log(`Engine Train Service running on port ${PORT}`);
});
