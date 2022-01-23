const ServiceUser = require("../models/ServiceUser");

const addServiceUser = async (req, res) => {
  try {
    const { name, dob, picture } = req.body;
    if (!name)
      return res.status(400).json({ message: "This field are required." });
    const serviceUser = await ServiceUser.create({
      name,
      dob,
      picture,
      company: req.user.company._id,
      service: req.service,
    });
    res.status(200).json(serviceUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateServiceUser = async (req, res) => {
  try {
    const { name, dob, picture, active } = req.body;
    if (!name)
      return res.status(400).json({ message: "This field are required." });
    const serviceUser = await ServiceUser.findByIdAndUpdate(
      req.params.id,
      {
        name,
        dob,
        picture,
        active,
        company: req.user.company._id,
        service: req.service,
      },
      { new: true }
    );
    if (!serviceUser)
      return res.status(404).json({ message: "Service user not found" });
    res.status(200).json(serviceUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getServiceUser = async (req, res) => {
  try {
    const serviceUser = await ServiceUser.findById(req.params.id);
    if (!serviceUser)
      return res.status(404).json({ message: "Service user not found" });
    res.status(200).json(serviceUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getServiceUsers = async (req, res) => {
  try {
    const serviceUsers = await ServiceUser.find({
      service: req.service,
    }).populate("service");
    res.status(200).json(serviceUsers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteServiceUser = async (req, res) => {
  try {
    const serviceUser = await ServiceUser.findByIdAndDelete(req.params.id);
    if (!serviceUser)
      return res.status(404).json({ message: "Service user not found" });
    res.status(200).json({ message: "Service user deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addServiceUser,
  updateServiceUser,
  getServiceUser,
  getServiceUsers,
  deleteServiceUser,
};
