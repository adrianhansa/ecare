const { findById } = require("../models/DailyObservation");
const DailyObservation = require("../models/DailyObservation");

const addRecord = async (req, res) => {
  try {
    const { date, shift, serviceUser, records } = req.body;
    if (!date || !shift || !serviceUser || !records)
      return res.status(400).json({ message: "Please complete all fields." });
    const record = await DailyObservation.create({
      date,
      shift,
      serviceUser,
      service: req.service,
      records,
      staff: req.user._id,
    });
    res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { date, shift, serviceUser, records } = req.body;
    if (!date || !shift || !serviceUser || !records)
      return res.status(400).json({ message: "Please complete all fields." });
    const record = await DailyObservation.findByIdAndUpdate(
      req.params.id,
      {
        date,
        shift,
        service: req.service,
        records,
        staff: req.user._id,
      },
      { new: true }
    );
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRecord = async (req, res) => {
  try {
    const record = await DailyObservation.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRecordsByDay = async (req, res) => {
  try {
    const records = await DailyObservation.find({
      service: req.service,
      date: req.params.date,
      archived: false,
    });
    if (!records) return res.status(404).json({ message: "Records not found" });
    res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRecordsByInterval = async (req, res) => {
  try {
    const records = await DailyObservation.find({
      service: req.service,
      date: { $gte: req.params.startDate, $lte: req.params.endDate },
      archived: false,
    });
    if (!records) return res.status(404).json({ message: "Records not found" });
    res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await DailyObservation.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const archiveRecord = async (req, res) => {
  try {
    const record = await DailyObservation.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const reactivateRecord = async (req, res) => {
  try {
    const record = await DailyObservation.findByIdAndUpdate(
      req.params.id,
      { archived: false },
      { new: true }
    );
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addRecord,
  updateRecord,
  deleteRecord,
  getRecord,
  getRecordsByDay,
  getRecordsByInterval,
  archiveRecord,
  reactivateRecord,
};
