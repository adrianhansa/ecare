const Supervision = require("../models/Supervision");

const addSupervision = async (req, res) => {
  try {
    if (!req.body.date || !req.body.supervisor || !req.body.supervisee)
      return res.status(400).json({ mesage: "All fields are required." });
    const supervision = await Supervision.create({
      date: req.body.date,
      plannedDate: req.body.plannedDate,
      supervisee: req.body.supervisee,
      supervisor: req.body.supervisor,
      service: req.service,
    });
    res.status(200).json(supervision);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSupervision = async (req, res) => {
  try {
    if (!req.body.plannedDate || !req.body.supervisor || !req.body.supervisee)
      return res.status(400).json({ mesage: "All fields are required." });
    const supervision = await Supervision.findByIdAndUpdate(
      req.params.id,
      {
        date: req.body.date,
        plannedDate: req.body.plannedDate,
        supervisee: req.body.supervisee,
        supervisor: req.body.supervisor,
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

const getLatestSupervision = async (req, res) => {
  try {
    const latestSupervision = await Supervision.findOne({ supervisee }).sort(
      "date",
      -1
    );
    if (!latestSupervision)
      return res.status(404).json({ message: "Supervision not found" });
    res.status(200).json(latestSupervision);
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
    const supervisions = await Supervision.find({ service: req.service })
      .populate("supervisor")
      .populate("supervisee");
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
    })
      .populate("supervisor")
      .populate("supervisee");
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
    })
      .populate("supervisor")
      .populate("supervisee");
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
  getLatestSupervision,
  getSupervision,
  getSupervisions,
  deleteSupervision,
  getSupervisionsBySupervisee,
  getSupervisionsBySupervisor,
};
