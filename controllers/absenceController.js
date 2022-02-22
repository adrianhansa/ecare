const Absence = require("../models/Absence");
const bradfordScore = require("../utils/bradfordScore");
const moment = require("moment");

const addAbsence = async (req, res) => {
  try {
    const { employee, startDate, endDate, days, notes } = req.body;
    if (!startDate || !endDate || !employee)
      return res.status(400).json({ message: "All the fields are required." });
    const absence = await Absence.create({
      employee,
      startDate,
      endDate,
      days,
      notes,
      service: req.service,
    });
    res.status(200).json(absence);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAbsence = async (req, res) => {
  try {
    const { startDate, endDate, days, notes } = req.body;
    if (!startDate || !endDate || !employee)
      return res.status(400).json({ message: "All the fields are required." });
    const absence = await Absence.findByIdAndUpdate(
      req.params.id,
      { startDate, endDate, days, notes },
      { new: true }
    );
    if (!absence) return res.status(404).json({ message: "Absence not found" });
    res.status(200).json(absence);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAbsence = async (req, res) => {
  try {
    const absence = await Absence.findById(req.params.id);
    if (!absence) return res.status(404).json({ message: "Absence not found" });
    res.status(200).json(absence);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBradfordScore = async (req, res) => {
  try {
    const absences = await Absence.find({
      employee: req.params.employee,
      startDate: { $gte: moment(new Date()).add(-364, "days") },
    });
    res.status(200).json(bradfordScore(absences));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAbsencesByEmployee = async (req, res) => {
  try {
    const { startDate, endDate, employee } = req.params;
    if (!startDate || !endDate)
      return res
        .status(400)
        .json({ message: "Both start and end date fields are required." });
    const absences = await Absence.find({
      employee,
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    });
    res.status(200).json(absences);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAbsencesByDates = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    if (!startDate || !endDate)
      return res
        .status(400)
        .json({ message: "Both start and end date fields are required." });
    const absences = await Absence.find({
      service: req.service,
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    });
    res.status(200).json(absences);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAbsence = async (req, res) => {
  try {
    const absence = await Absence.findByIdAndDelete(req.params.id);
    if (!absence) return res.status(404).json({ message: "Absence not found" });
    res.status(200).json({ message: "Absence deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAbsence,
  updateAbsence,
  deleteAbsence,
  getAbsence,
  getAbsencesByDates,
  getAbsencesByEmployee,
  getBradfordScore,
};
