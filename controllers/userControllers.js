const User = require("../models/User");
const Company = require("../models/Company");
const sendToken = require("../utils/sendToken");
const { populate } = require("../models/User");

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
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, logout };
