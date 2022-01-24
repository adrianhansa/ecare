const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    time: { type: String },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employees",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "services",
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("diaries", diarySchema);
