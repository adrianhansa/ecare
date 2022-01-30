const Handover = require("../models/Handover");

const addHandoverEntry = async (req, res) => {
  try {
    const { date, time, notes, serviceUser } = req.body;
    if (!date || !time || !notes || !serviceUser)
      return res
        .status(400)
        .json({ message: "Please fill in all the fields." });
    const handoverEntry = await Handover.create({
      date,
      time,
      notes,
      serviceUser,
      service: req.service,
      employee: req.user.id,
    });
    res.status(200).json(handoverEntry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateHandoverEntry = async (req, res) => {
  try {
    const { date, time, notes, serviceUser } = req.body;
    if ((!date || !time || !notes, !serviceUser))
      return res
        .status(400)
        .json({ message: "Please fill in all the fields." });
    const handoverEntry = await Handover.findByIdAndUpdate(
      req.params.id,
      { date, time, notes, employee: req.user.id, serviceUser },
      { new: true }
    );
    if (!handoverEntry)
      return res.status(404).json({ message: "Handover entry not found." });
    res.status(200).json(handoverEntry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getHandoverEntry = async (req, res) => {
  try {
    const handoverEntry = await Handover.findById(req.params.id);
    if (!handoverEntry)
      return res.status(404).json({ message: "Handover entry not found" });
    res.status(200).json(handoverEntry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getHandoverEntries = async (req, res) => {
  try {
    const handoverEntries = await Handover.find({ service: req.service });
    res.status(200).json(handoverEntries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getHandoverEntriesByServiceUser = async (req, res) => {
  try {
    const handoverEntries = await Handover.find({
      serviceUser: req.body.serviceUser,
    });
    res.status(200).json(handoverEntries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteHandoverEntry = async (req, res) => {
  try {
    const handoverEntry = await Handover.findByIdAndDelete(req.params.id);
    if (!handoverEntry)
      return res.status(404).json({ message: "Handover entry not found" });
    res.status(200).json({ message: "Handover deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addHandoverEntry,
  updateHandoverEntry,
  getHandoverEntries,
  getHandoverEntriesByServiceUser,
  getHandoverEntry,
  deleteHandoverEntry,
};
