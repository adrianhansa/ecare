const mongoose = require("mongoose");
// const moment = require("moment");

const supervisionSchema = new mongoose.Schema({
  supervisee: { type: mongoose.Schema.Types.ObjectId, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, required: true },
  plannedDate: { type: Date, required: true },
  date: { type: Date },
  // nextDate: { type: Date },
});

// supervisionSchema.pre("save", function () {
//   this.nextDate = moment(this.date).add(56, "days");
// });

module.exports = mongoose.model("supervisions", supervisionSchema);
