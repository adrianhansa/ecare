const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "services",
  },
  active: { type: Boolean, default: true },
  name: { type: String },
  description: { type: String, required: true },
  element: { type: String },
});

module.exports = mongoose.model("dailyObservationItems", itemSchema);
