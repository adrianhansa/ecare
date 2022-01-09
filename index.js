const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"] }));

const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const workingStatusRoutes = require("./routes/workingStatusRoutes");
app.use("/", userRoutes);
app.use("/services", serviceRoutes);
app.use("/employees", employeeRoutes);
app.use("/working-status", workingStatusRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to Mongodb Atlas");
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
