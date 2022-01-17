const Service = require("../models/Service");

const service = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      company: req.user.company._id,
      slug: req.params.service,
    });
    if (!service) return res.status(404).json({ message: "Service not found" });
    req.service = service._id;
    next();
  } catch (error) {
    return res.satus(500).json({ message: error.message });
  }
};
module.exports = service;
