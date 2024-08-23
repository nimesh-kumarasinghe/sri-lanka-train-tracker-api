const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`User Auth Service running on port ${PORT}`);
});
