const express = require("express");
const connectDB = require("./config/mongoConfig");
const locationRoutes = require("./routes/locationRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

connectDB();

app.use("/api", locationRoutes);

app.listen(PORT, () => {
  console.log(`Location Service running on port ${PORT}`);
});
