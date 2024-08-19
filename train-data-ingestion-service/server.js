const express = require("express");
const bodyParser = require("body-parser");
const { connectToDatabase } = require("./config/db-config");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
