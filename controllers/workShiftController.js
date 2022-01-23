const WorkShift = require("../models/WorkShift");

const addWorkShift = async (req, res) => {
  try {
    const { date, employee, shift, startTime, endTime, notes, allocatedTo } =
      req.body;
    if (!date || !employee || !shift || !startTime || !endTime)
      return res.status(400).json({ message: "All fields are required." });
    const workShift = await WorkShift.create({
      date,
      employee,
      shift,
      startTime,
      endTime,
      notes,
      allocatedTo,
      service: req.service,
    });
    res.status(200).json(workShift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateWorkShift = async (req, res) => {
  try {
    const { date, employee, shift, startTime, endTime, notes, allocatedTo } =
      req.body;
    if (!date || !employee || !shift || !startTime || !endTime)
      return res.status(400).json({ message: "All fields are required." });
    const workShift = await WorkShift.findByIdAndUpdate(
      req.params.id,
      {
        date,
        employee,
        shift,
        startTime,
        endTime,
        notes,
        allocatedTo,
      },
      { new: true }
    );
    if (!workShift)
      return res.status(404).json({ message: "Working shift not found" });
    res.status(200).json(workShift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteWorkShift = async (req, res) => {
  try {
    const workShift = await WorkShift.findByIdAndDelete(req.params.id);
    if (!workShift)
      return res.status(404).json({ message: "Working shift not found" });
    res.status(200).json({ message: "Shift deleted." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkShift = async (req, res) => {
  try {
    const workShift = await WorkShift.findById(req.params.id);
    if (!workShift)
      return res.status(404).json({ message: "Working shift not found" });
    res.status(200).json(workShift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkShiftsByDay = async (req, res) => {
  try {
    const workshifts = await WorkShift.find({
      service: req.user.service._id,
      date: req.params.day,
    });
    res.status(200).json(workshifts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkShiftsByInterval = async (req, res) => {
  try {
    const workshifts = await WorkShift.find({
      service: req.service,
      date: { $gte: req.params.start, $lte: req.params.end },
    }).populate("shift");
    res.status(200).json(workshifts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getShiftsByEmployeeByDay = async (req, res) => {
  try {
    const workshifts = await WorkShift.find({
      service: req.service,
      employee: req.params.employee,
      date: req.params.day,
    });
    res.status(200).json(workshifts);
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
  getShiftsByEmployeeByDay,
};
