const Service = require("../models/Service");

const addService = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    if (!name)
      return res.status(400).json({ message: "The name is required." });
    const existingService = await Service.findOne({
      name,
      company: req.user.company._id,
    });
    if (existingService)
      return res.status(400).json({
        message:
          "You already have a service with this name. Please enter a different name.",
      });
    const service = await Service.create({
      name,
      phone,
      address,
      company: req.user.company._id,
    });
    res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res.status(404).json({ message: "Service not found." });
    res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find({ company: req.user.company._id });
    res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    if (!req.body.name)
      return res.status(400).json({ message: "The name is required" });
    const existingService = await Service.findOne({ name: req.body.name });
    if (existingService)
      return res.status(400).json({
        message:
          "You already have a service with this name. Please enter a different name.",
      });
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, address: req.body.address, phone: req.body.phone },
      { new: true }
    );
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.service);
    if (!service) return res.status(404).json({ message: "Service not founr" });
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addService,
  getService,
  getServices,
  updateService,
  deleteService,
};
