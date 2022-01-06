const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("services", serviceSchema);
