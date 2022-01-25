const Supervision = require("../models/Supervision");

const addSupervision = async (req, res) => {
  try {
    if (!req.plannedDate || !req.supervisee || !req.supervisor)
      return res.status(400).json({ mesage: "All fields are required." });
    const supervision = await Supervision.create({
      date: req.date,
      plannedDate: req.plannedDate,
      supervisee: req.supervisee,
      supervisor: req.supervisor,
      service: req.service,
    });
    res.status(200).json(supervision);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSupervision = async (req, res) => {
  try {
    if (!req.date || !req.employee)
      return res.status(400).json({ mesage: "All fields are required." });
    const supervision = await Supervision.findByIdAndUpdate(
      req.params.id,
      {
        date: req.date,
        plannedDate: req.plannedDate,
        supervisee: req.supervisee,
        supervisor: req.supervisor,
      },
      { new: true }
    );
    if (!supervision)
      return res.status(404).json({ message: "Supervision not found" });
    res.status(200).json(supervision);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSupervision = async (req, res) => {
  try {
    const supervision = await Supervision.findById(req.params.id);
    if (!supervision)
      return res.status(404).json({ message: "Supervision not found" });
    res.status(200).json(supervision);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSupervisions = async (req, res) => {
  try {
    const supervisions = await Supervision.find({ service: req.service });
    res.status(200).json(supervisions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSupervisionsBySupervisee = async (req, res) => {
  try {
    const supervisions = await Supervision.find({
      service: req.service,
      supervisee: req.params.supervisee,
    }).populate("supervisee");
    res.status(200).json(supervisions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSupervisionsBySupervisor = async (req, res) => {
  try {
    const supervisions = await Supervision.find({
      service: req.service,
      supervisor: req.params.supervisor,
    }).populate("supervisor");
    res.status(200).json(supervisions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSupervision = async (req, res) => {
  try {
    const supervision = await Supervision.findByIdAndDelete(req.params.id);
    if (!supervision)
      return res.status(404).json({ message: "Supervision not found" });
    res.status(200).json({ message: "Supervision deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addSupervision,
  updateSupervision,
  getSupervision,
  getSupervisions,
  deleteSupervision,
  getSupervisionsBySupervisee,
  getSupervisionsBySupervisor,
};
