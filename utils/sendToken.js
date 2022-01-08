const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, role: user.role },
    process.env.JWT_SECRET
  );
  if (!token)
    return res.status(500).json({ message: "Token could not be sent." });
  res.status(statusCode).cookie("token", token, { httpOnly: true }).json({
    id: user._id,
    company: user.company,
    role: user.role,
    isAdmin: user.isAdmin,
  });
};

module.exports = sendToken;
