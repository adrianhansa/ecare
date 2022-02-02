const mongoose = require("mongoose");

const dailyObservationSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    shift: { type: String, required: true },
    staff: { type: Schema.Types.ObjectId, required: true, ref: "employees" },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
    archived: { type: Boolean, default: false },
    serviceUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service-users",
      required: true,
    },
    records: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("daily-observations", dailyObservationSchema);
