const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
