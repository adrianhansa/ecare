const OnCallLog = require("../models/OnCallLog");

const addOnCallLog = async (req, res) => {
  try {
    const { date, time, issue, service, action } = req.body;
    if (!date || !time || !issue || !service || !action) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const onCallManager = req.user.id;
    const company = req.user.company;
    const onCallLog = await OnCallLog.create({
      onCallManager,
      date,
      time,
      issue,
      service,
      action,
      company,
    });
    res.status(200).json(onCallLog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOnCallLog = async (req, res) => {
  try {
    const { date, time, issue, service, action } = req.body;
    if (!date || !time || !issue || !service || !action) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const onCallLog = await OnCallLog.findByIdAndUpdate(
      req.params.id,
      {
        date,
        time,
        issue,
        service,
        action,
      },
      { new: true }
    );
    if (!onCallLog)
      return res.status(404).json({ message: "On call log not found." });
    res.status(200).json(onCallLog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOnCallLog = async (req, res) => {
  try {
    const onCallLog = await OnCallLog.findById(req.params.id);
    if (!onCallLog)
      return res.status(404).json({ message: "On call log not found." });
    res.status(200).json(onCallLog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllOnCallLogs = async (req, res) => {
  try {
    const onCallLogs = await OnCallLog.find({ company: req.user.company });
    res.status(200).json(onCallLogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOnCallLogByService = async (req, res) => {
  try {
    const onCallLogs = await OnCallLog.find({
      company: req.user.company,
      service: req.service,
    });
    res.status(200).json(onCallLogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOnCallLog = async (req, res) => {
  try {
    const onCallLog = await OnCallLog.findByIdAndDelete(req.params.id);
    if (!onCallLog)
      return res.status(404).json({ message: "On call log not found." });
    res.status(200).json({ message: "On call deleted." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOnCallLog,
  updateOnCallLog,
  deleteOnCallLog,
  getAllOnCallLogs,
  getOnCallLog,
  getOnCallLogByService,
};
