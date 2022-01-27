const mongoose = require("mongoose");

const communicationSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "services",
    },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employees",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("communications", communicationSchema);
