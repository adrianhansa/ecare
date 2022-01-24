const mongoose = require("mongoose");

const serviceUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
    picture: { type: String },
    dob: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("service-users", serviceUserSchema);
