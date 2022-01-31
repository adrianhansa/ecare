const mongoose = require("mongoose");

const anualLeaveTakenSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  workingHours: { type: Number, required: true },
});

const annualLeaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "employees",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "services",
  },
  anualEntitlement: { type: Number, required: true },
  annualLeaveTake: [annualLeaveSchema],
  remainedAnnualLeave: { type: Number, required: true },
});

module.exports = mongoose.model("annuaLeaves", annualLeaveSchema);
