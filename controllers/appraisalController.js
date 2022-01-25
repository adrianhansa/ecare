const Appraisal = require("../models/Appraisal");

const addAppraisal = async (req, res) => {
  try {
    if (!req.date || !req.employee)
      return res.status(400).json({ mesage: "All fields are required." });
    const appraisal = await Appraisal.create({
      date: req.date,
      employee: req.employee,
      service: req.service,
    });
    res.status(200).json(appraisal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAppraisal = async (req, res) => {
  try {
    if (!req.date || !req.employee)
      return res.status(400).json({ mesage: "All fields are required." });
    const appraisal = await Appraisal.findByIdAndUpdate(
      req.params.id,
      { date: req.date, employee: req.employee },
      { new: true }
    );
    if (!appraisal)
      return res.status(404).json({ message: "Appraisal not found" });
    res.status(200).json(appraisal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAppraisal = async (req, res) => {
  try {
    const appraisal = await Appraisal.findById(req.params.id);
    if (!appraisal)
      return res.status(404).json({ message: "Appraisal not found" });
    res.status(200).json(appraisal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAppraisals = async (req, res) => {
  try {
    const appraisals = await Appraisal.find({ service: req.service });
    res.status(200).json(appraisals);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAppraisal = async (req, res) => {
  try {
    const appraisal = await Appraisal.findByIdAndDelete(req.params.id);
    if (!appraisal)
      return res.status(404).json({ message: "Appraisal not found" });
    res.status(200).json({ message: "Appraisal deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAppraisal,
  updateAppraisal,
  getAppraisal,
  getAppraisals,
  deleteAppraisal,
};
