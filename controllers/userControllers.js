const User = require("../models/User");
const Company = require("../models/Company");
const sendToken = require("../utils/sendToken");
const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");

const register = async (req, res) => {
  try {
    const { email, name, password, passwordVerify, companyName } = req.body;
    if (!email || !password || !name || !passwordVerify || !companyName)
      return res.status(400).json({ message: "All fields are required" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ mesage: "This email is already in use. Please login." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "The password must contain at least 6 characters." });
    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ message: "The two passwords must be identical." });
    const existingCompany = await Company.findOne({ name });
    if (existingCompany)
      return res.status(400).json({
        message:
          "There is already a company registered with this name. Please choose another one.",
      });
    const company = await Company.create({ name: companyName });
    const user = await User.create({
      name,
      email,
      password,
      company: company._id,
    });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email/password are required" });
    const user = await User.findOne({ email }).populate("company");
    if (!user) return res.status(404).json({ message: "User not found" });
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify)
      return res.status(400).json({ message: "Invalid email/password" });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const employeeLogin = async (req, res) => {
  try {
    const { payrollNumber, password } = req.body;
    if (!payrollNumber || !password)
      return res.status(400).json({ message: "All fields are required." });
    const user = await Employee.findOne({ payrollNumber });
    if (!user) return res.status(404).json({ message: "Employee not found." });
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify)
      return res.status(400).json({ message: "Invalid email/password" });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, employeeLogin, logout };
