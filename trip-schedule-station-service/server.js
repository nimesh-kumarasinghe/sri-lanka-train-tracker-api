const express = require("express");
const morgan = require("morgan");
const { connectToDatabase } = require("./config/dbConfig");
const tripRoutes = require("./routes/tripRoutes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("combined"));

app.use("/api", tripRoutes);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Trip Route Service running on port ${PORT}`);
});
