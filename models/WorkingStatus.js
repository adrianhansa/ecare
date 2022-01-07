const mongoose = require("mongoose");

const workingStatusSchema = new mongoose.Schema(
  {
    present: { type: Boolean, default: true, required: true },
    description: { type: String, required: true }, //on shift, training, off sick, suspended, holiday, meetings
  },
  { timestamps: true }
);

module.exports = mongoose.model(workingStatusSchema, "workingstatus");
