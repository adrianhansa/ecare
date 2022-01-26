const Communication = require("../models/Communication");

const addCommunication = async (req, res) => {
  try {
    const { date, content } = req.body;
    if (!date || !content)
      return res.status(400).json({ message: "All fields are required." });
    const communication = await Communication.create({
      date,
      content,
      sender: req.user.id,
      service: req.service,
    });
    res.status(200).json(communication);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCommunication = async (req, res) => {
  try {
    const { date, content } = req.body;
    if (!date || !content)
      return res.status(400).json({ message: "All fields are required." });
    const communication = await Communication.findByIdAndUpdate(
      req.params.id,
      {
        date,
        content,
        sender: req.user.id,
      },
      { new: true }
    );
    if (!communication)
      return res
        .status(404)
        .json({ message: "Communication entry not found." });
    res.status(200).json(communication);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCommunication = async (req, res) => {
  try {
    const communication = await Communication.findByIdAndDelete(req.params.id);
    if (!communication)
      return res
        .status(404)
        .json({ message: "Communication entry not found." });
    res.status(200).json({ message: "Communication entry deleted." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCommunication = async (req, res) => {
  try {
    const communication = await Communication.findById(req.params.id);
    if (!communication)
      return res
        .status(404)
        .json({ message: "Communication entry not found." });
    res.status(200).json(communication);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCommunications = async (req, res) => {
  try {
    const communications = await Communication.find({ service: req.service });
    res.status(200).json(communications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCommunication,
  updateCommunication,
  deleteCommunication,
  getCommunication,
  getCommunications,
};
