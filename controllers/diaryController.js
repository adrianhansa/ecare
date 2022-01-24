const Diary = require("../models/Diary");

const addDiaryEntry = async (req, res) => {
  try {
    const { date, time, content } = req.body;
    if (!date || !content)
      return res
        .status(400)
        .json({ message: "Both date and content fields are required." });
    const diaryEntry = await Diary.create({
      date,
      time,
      content,
      service: req.service,
      employee: req.user.id,
    });
    res.status(200).json(diaryEntry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateDiaryEntry = async (req, res) => {
  try {
    const { date, time, content } = req.body;
    if (!date || !content)
      return res
        .status(400)
        .json({ message: "Both date and content fields are required." });
    const diaryEntry = await Diary.findByIdAndUpdate(
      req.params.id,
      {
        date,
        time,
        content,
        employee: req.user.id,
      },
      { new: true }
    );
    if (!diaryEntry)
      return res.status(404).json({ message: "Diary entry not found." });
    res.status(200).json(diaryEntry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDiaryEntry = async (req, res) => {
  try {
    const diaryEntry = await Diary.findById(req.params.id);
    if (!diaryEntry)
      return res.status(404).json({ message: "Diary entry not found." });
    res.status(200).json(diaryEntry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDiaryEntries = async (req, res) => {
  try {
    const diaryEntries = await Diary.find({ service: req.service });
    res.status(200).json(diaryEntries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteDiaryEntry = async (req, res) => {
  try {
    const diaryEntry = await Diary.findByIdAndDelete(req.params.id);
    if (!diaryEntry)
      return res.status(404).json({ message: "Diary entry not found." });
    res.status(200).json({ message: "Diary entry deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
  getDiaryEntries,
  getDiaryEntry,
};
