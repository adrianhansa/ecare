const mongoose = require("mongoose");

const workingStatusSchema = new mongoose.Schema(
  {
    presence: { type: Boolean, required: true },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "services",
    },
    description: { type: String, required: true }, //on shift, training, off sick, suspended, holiday, meetings, shadowing
  },
  { timestamps: true }
);

module.exports = mongoose.model("workingstatus", workingStatusSchema);
