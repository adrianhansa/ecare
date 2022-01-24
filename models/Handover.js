const mongoose = require("mongoose");

const handOverSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    notes: { type: String, required: true },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "services",
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employees",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("handovers", handOverSchema);
