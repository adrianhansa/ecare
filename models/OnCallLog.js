const mongoose = require("mongoose");

const onCallSchema = new mongoose.Schema(
  {
    onCallManager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employees",
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    issue: { type: String, required: true },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "services",
    },
    action: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "companies",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("on-call-logs", onCallSchema);
