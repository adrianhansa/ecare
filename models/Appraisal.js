const mongoose = require("mongoose");
const moment = require("moment");

const appraisalSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  nextDate: { type: Date },
});

appraisalSchema.pre("save", function () {
  this.nextDate = moment(this.date).add(64, "days");
});

module.exports = mongoose.model("appraisals", appraisalSchema);
