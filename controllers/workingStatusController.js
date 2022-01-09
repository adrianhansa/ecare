const WorkingStatus = require("../models/WorkingStatus");

const addWorkingStatus = async (req, res) => {
  try {
    const { presence, description } = req.body;
    if (!description)
      return res.status(400).json({ message: "All fields are required" });
    const workingStatus = await WorkingStatus.create({
      presence,
      description,
      service: req.user.service._id,
    });
    res.status(200).json(workingStatus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkingStatus = async (req, res) => {
  try {
    const workingStatus = await WorkingStatus.findById(req.params.id);
    res.status(200).json(workingStatus);
    if (!workingStatus)
      return res.status(404).json({ message: "Working status not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWorkingStatuses = async (req, res) => {
  try {
    const workingStatuses = await WorkingStatus.find({
      service: req.user.service._id,
    });
    res.status(200).json(workingStatuses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateWorkingStatus = async (req, res) => {
  try {
    const { presence, description } = req.body;
    if (!description)
      return res.status(400).json({ message: "All fields are required" });
    const workingStatus = await WorkingStatus.findByIdAndUpdate(
      req.params.id,
      { presence, description },
      { new: true }
    );
    res.status(200).json(workingStatus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteWorkingStatus = async (req, res) => {
  try {
    const workingStatus = await WorkingStatus.findByIdAndDelete(req.params.id);
    if (!workingStatus)
      return res.status(404).json({ message: "Working status not found" });
    res.status(200).json({ message: "Working status deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addWorkingStatus,
  updateWorkingStatus,
  deleteWorkingStatus,
  getWorkingStatus,
  getWorkingStatuses,
};
