const express = require("express");
const bodyParser = require("body-parser");
const { connectToDatabase } = require("./config/db-config");
const dataRoutes = require("./routes/dataRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use("/api/trains", dataRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  await connectToDatabase();
});
