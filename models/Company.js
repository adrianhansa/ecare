const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("companies", companySchema);
