const mongoose = require("mongoose");

const workShiftSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employees",
    },
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "shifts",
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: Number },
    notes: { type: String },
    workingStatus: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "workingstatus",
    },
  },
  { timestamps: true }
);

workShiftSchema.pre("save", function () {
  const startHour = this.startTime.split(":")[0];
  const startMin = this.startTime.split(":")[1];
  const start = startHour * 3600 + startMin * 60;

  const endHour = this.endTime.split(":")[0];
  const endMin = this.endTime.split(":")[1];
  const end = endHour * 3600 + endMin * 60;
  if (end < start) {
    this.duration = 86400 - start + end;
  } else {
    this.duration = end - start;
  }
});

module.exports = mongoose.model("workshifts", workShiftSchema);
