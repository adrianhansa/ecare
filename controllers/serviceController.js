const Service = require("../models/Service");
const slugify = require("slugify");

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
    slug = slugify(name, { remove: /[*+~.()'"!?:@]/g, lower: true });
    const service = await Service.create({
      name,
      slug,
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
    const service = await Service.findOne({
      slug: req.params.slug,
      company: req.user.company._id,
    });
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
    slug = slugify(req.body.name, { remove: /[*+~.()'"!?:@]/g, lower: true });
    const existingService = await Service.findById(req.params.id);
    if (existingService.name !== req.body.name) {
      //if the name was changed, check if the new name was already taken
      const otherService = await Service.findOne({ name: req.body.name });
      if (otherService)
        return res
          .status(400)
          .json({
            message: "Please select a diffrent name; this one is taken.",
          });
    }
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        slug,
      },
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
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
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
