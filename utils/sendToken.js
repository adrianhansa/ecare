const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      accessLevel: user.accessLevel,
      service: user.service ? user.service : "n/a",
      company: user.company,
    },
    process.env.JWT_SECRET
  );
  if (!token)
    return res.status(500).json({ message: "Token could not be sent." });
  res
    .status(statusCode)
    .cookie("token", token, { httpOnly: true })
    .json({
      name: user.name,
      id: user._id,
      service: user.service ? user.service : "n/a",
      company: user.company,
    });
};

module.exports = sendToken;
