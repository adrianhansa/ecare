const mongoose = require("mongoose");

const handOverSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("handovers", handOverSchema);
