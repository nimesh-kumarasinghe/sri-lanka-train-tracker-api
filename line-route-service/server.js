const express = require("express");
const morgan = require("morgan");
const lineRoutes = require("./routes/lineRoutes");
const routeRoutes = require("./routes/routeRoutes");
const { connectToDatabase } = require("./config/dbConfig");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("combined"));

app.use("/api", lineRoutes, routeRoutes);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Line Route Service running on port ${PORT}`);
});
