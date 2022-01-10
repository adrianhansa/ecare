const WorkShift = require("../models/WorkShift");

const addWorkShift = async (req, res) => {
  try {
    const { date, employee, shift, startTime, endTime, notes, workingStatus } =
      req.body;
    if (
      !date ||
      !employee ||
      !shift ||
      !startTime ||
      !endTime ||
      !workingStatus
    )
      return res.status(400).json({ message: "All fields are required." });
    const workShift = await WorkShift.create({
      date,
      employee,
      shift,
      startTime,
      endTime,
      notes,
      workingStatus,
      service: req.user.service._id,
    });
    res.status(200).json(workShift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateWorkShift = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteWorkShift = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkShift = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkShiftsByDay = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkShiftsByInterval = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addWorkShift,
  updateWorkShift,
  deleteWorkShift,
  getWorkShift,
  getWorkShiftsByDay,
  getWorkShiftsByInterval,
};
