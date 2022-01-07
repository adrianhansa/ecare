const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    inProbation: { type: Boolean, default: false },
    payrollNumber: { type: String, unique: true, default: 0 },
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
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    driver: { type: Boolean, default: false },
    contractHours: { type: Number, default: 0 },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employees", employeeSchema);
