const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "services",
    },
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: Number },
    present: { type: Boolean, default: false },
  },
  { timestamps: true }
);

shiftSchema.pre("save", function () {
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

module.exports = mongoose.model("shifts", shiftSchema);
