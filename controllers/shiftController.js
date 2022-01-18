const Shift = require("../models/Shift");

const addShift = async (req, res) => {
  try {
    const { name, startTime, endTime, present } = req.body;
    if (!name || !startTime || !endTime)
      return res.status(400).json({ message: "All fields are required." });
    const shift = await Shift.create({
      name,
      startTime,
      endTime,
      present,
      service: req.service,
    });
    res.status(200).json(shift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateShift = async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body;
    if (!name || !startTime || !endTime)
      return res.status(400).json({ message: "All fields are required." });
    const startHour = startTime.split(":")[0];
    const startMin = startTime.split(":")[1];
    const start = startHour * 3600 + startMin * 60;

    const endHour = endTime.split(":")[0];
    const endMin = endTime.split(":")[1];
    const end = endHour * 3600 + endMin * 60;
    if (end < start) {
      duration = 86400 - start + end;
    } else {
      duration = end - start;
    }
    const shift = await Shift.findByIdAndUpdate(
      req.params.id,
      { name, startTime, endTime, duration, present: req.body.present },
      { new: true }
    ).populate("service");
    if (!shift) return res.status(404).json({ message: "Shift not found." });
    res.status(200).json(shift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.id);
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    res.status(200).json({ message: "Shift deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getShift = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id).populate("service");
    if (!shift) return res.status(404).json({ message: "Shift not found" });
    res.status(200).json(shift);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find({ service: req.service }).populate(
      "service"
    );
    res.status(200).json(shifts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addShift, updateShift, deleteShift, getShift, getShifts };
