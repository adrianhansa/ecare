const Employee = require("../models/Employee");
const niceware = require("niceware");

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      payrollNumber,
      service,
      address,
      phone,
      contractHours,
      role,
      driver,
      accessLevel,
    } = req.body;
    if (!name || !payrollNumber || !service || !role || !accessLevel)
      return res.status(400).json({ message: "All fields are required" });
    const password = niceware.generatePassphrase(8)[0];

    const existingEmployee = await Employee.findOne({
      company: req.user.company._id,
      payrollNumber,
    });
    if (existingEmployee)
      return res.status(400).json({
        message:
          "There is already an employee registered with this payroll number",
      });

    //TO DO: when creating the user: email the password to the user and encode the password in the database
    const employee = await Employee.create({
      name,
      email,
      payrollNumber,
      service,
      address,
      phone,
      contractHours,
      role,
      accessLevel,
      password,
      driver,
      company: req.user.company._id,
    });
    res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      payrollNumber,
      service,
      address,
      phone,
      contractHours,
      role,
      driver,
      accessLevel,
    } = req.body;
    if (!name || !payrollNumber || !service || !role || !accessLevel)
      return res.status(400).json({ message: "All fields are required" });
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        payrollNumber,
        service,
        address,
        phone,
        contractHours,
        role,
        driver,
        accessLevel,
      },
      { new: true }
    );
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      service: req.user.service._id,
    }).populate("service");
    res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      company: req.user.company._id,
    }).populate("service");
    res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  getEmployees,
};
