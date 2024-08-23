const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config();
const morgan = require("morgan");

app.use(express.json());
app.use("/api", userRoutes);
app.use(morgan("combined"));

const PORT = process.env.PORT;
const log = require("./utils/logger");

app.listen(PORT, () => {
  log(`Engine Train Service running on port ${PORT}`);
  console.log(`User Auth Service running on port ${PORT}`);
});
