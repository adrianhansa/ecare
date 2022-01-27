const mongoose = require("mongoose");
// const moment = require("moment");

const appraisalSchema = new mongoose.Schema({
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
  date: { type: Date, required: true },
});

// appraisalSchema.pre("save", function () {
//   this.nextDate = moment(this.date).add(64, "days");
// });

module.exports = mongoose.model("appraisals", appraisalSchema);
