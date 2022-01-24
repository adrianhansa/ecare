const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ecare.herokuapp.com"],
    credentials: true,
  })
);

const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const shiftRoutes = require("./routes/shiftRoutes");
const workShiftRoutes = require("./routes/workShiftRoutes");
const serviceUserRoutes = require("./routes/serviceUserRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
const handoverRoutes = require("./routes/handoverEntryRoutes");
app.use("/", userRoutes);
app.use("/services", serviceRoutes);
app.use("/employees", employeeRoutes);
app.use("/shifts", shiftRoutes);
app.use("/work-shifts", workShiftRoutes);
app.use("/service-users", serviceUserRoutes);
app.use("/diary", diaryRoutes);
app.use("/handover", handoverRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to Mongodb Atlas");
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
