const DailyObservationItem = require("../models/DailyObservationItem");

const addItem = async (req, res) => {
  try {
    if (!req.body.description || !req.body.element)
      return res.status(400).json({ message: "All fields are required." });
    const item = await DailyObservationItem.create({
      description: req.body.description,
      element: req.body.element,
      service: req.service,
    });
    res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    if (!req.body.description || !req.body.element)
      return res.status(400).json({ message: "All fields are required." });
    const item = await DailyObservationItem.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        element: req.body.element,
        active: req.body.active,
      },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await DailyObservationItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const item = await DailyObservationItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    const updatedItem = await DailyObservationItem.findByIdAndUpdate(
      req.params.id,
      { active: !item.active },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await DailyObservationItem.find({ service: req.service });
    res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await DailyObservationItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addItem,
  updateItem,
  deleteItem,
  toggleStatus,
  getItem,
  getItems,
};
