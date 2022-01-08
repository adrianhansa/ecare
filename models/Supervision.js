const mongoose = require("mongoose");
const moment = require("moment");

const supervisionSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  nextDate: { type: Date },
});

supervisionSchema.pre("save", function () {
  this.nextDate = moment(this.date).add(56, "days");
});

module.exports = mongoose.model("supervisions", supervisionSchema);
