const DailyObservation = require("../models/DailyObservation");

const findRecord = async (req, res) => {
  try {
    const { date, shift, serviceUser } = req.params;
    if (!shift || !date || !serviceUser)
      return res.status(400).json({ message: "Missing parameters" });
    const record = await DailyObservation.findOne({
      service: req.service,
      serviceUser,
      date,
      shift,
    });
    if (record)
      //return res.json(); //res.status(404).json({ message: "Record not found" });
      res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addRecord = async (req, res) => {
  try {
    const { date, shift, serviceUser, records } = req.body;
    if (!date || !shift || !serviceUser || !records)
      return res.status(400).json({ message: "Please complete all fields." });
    //check for existing record
    // const existingRecord = await DailyObservation.findOne({
    //   service: req.service,
    //   date,
    //   shift,
    // });
    // if (existingRecord)
    //   return res
    //     .status(400)
    //     .json({ message: "You have already created this document." });
    const record = await DailyObservation.create({
      date,
      shift,
      serviceUser,
      service: req.service,
      records,
      staff: req.user.id,
    });
    res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { date, shift, records } = req.body;
    if (!date || !shift || !records)
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

const getRecordsByResident = async (req, res) => {
  try {
    const records = await DailyObservation.find({
      serviceUser: req.params.serviceUser,
    });
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
  findRecord,
  getRecordsByResident,
};
