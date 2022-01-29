const mongoose = require("mongoose");

const serviceUsersSchema = new mongoose.Schema({
  serviceUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "serviceUsers",
  },
});

const handOverSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    notes: { type: String, required: true },
    serviceUsers: [serviceUsersSchema],
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "services",
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employees",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("handovers", handOverSchema);
