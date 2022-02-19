const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employeees",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: { type: Array, required: true },
    notes: { type: String },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "services",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("absences", absenceSchema);
