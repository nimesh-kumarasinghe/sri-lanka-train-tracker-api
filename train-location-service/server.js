const express = require("express");
const connectDB = require("./config/mongoConfig");
const locationRoutes = require("./routes/locationRoutes");
const updateLocation = require("./controllers/locationController");
//const morgan = require("morgan");
//const logger = require("./utils/logger");

require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
// app.use(
//   morgan("combined", { stream: { write: (message) => logger(message.trim()) } })
// );

// Routes
app.use("/api/location", locationRoutes);

console.log(updateLocation.updateLocation);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Location Service running on port ${PORT}`);
});
