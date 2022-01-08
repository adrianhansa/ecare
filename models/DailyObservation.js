const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const visitSchema = new mongoose.Schema({
  visitor: { type: String }, //family, health professional, sw etc
  typeOfVisit: { type: String }, //in person, telephone, other
  details: { type: String },
});

const dailyObservationSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
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
    serviceUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service-users",
      required: true,
    },
    staff_am: [staffSchema],
    staff_pm: [staffSchema],
    staff_night: [staffSchema],
    meds_given_am: { type: Boolean, default: false },
    meds_given_pm: { type: Boolean, default: false },
    prn: { type: Boolean, default: false },
    health_issues_am: { type: String, default: "" },
    health_issues_pm: { type: String, default: "" },
    health_issues_night: { type: String, default: "" },
    observations_am: { type: String, required: true },
    observations_pm: { type: String, required: true },
    observations_night: { type: String, required: true },
    breakfast_offered: { type: String, required: true },
    breakfast_eaten: { type: String, required: true },
    lunch_offered: { type: String, required: true },
    lunch_eaten: { type: String, required: true },
    snacks_offered: { type: String, required: true },
    snacks_eaten: { type: String, required: true },
    fluid_offered_am: { type: String, required: true },
    fluid_taken_am: { type: String, required: true },
    fluid_offered_pm: { type: String, required: true },
    fluid_taken_pm: { type: String, required: true },
    su_comments: { type: String, default: "" },
    others: { type: String, default: "" },
    visits: [visitSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("daily-observations", dailyObservationSchema);
