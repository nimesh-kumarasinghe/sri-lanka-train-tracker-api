const express = require("express");
const morgan = require("morgan");
const { connectToDatabase } = require("./config/dbConfig");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("combined"));

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Engine Train Service running on port ${PORT}`);
});
