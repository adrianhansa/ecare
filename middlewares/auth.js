const jwt = require("jsonwebtoken");

const checkedUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: "Missing token" });
  const userVerified = jwt.verify(token, process.env.JWT_SECRET);
  if (!userVerified) return res.status(401).json({ message: "Invalid token" });
  req.user = userVerified;
};

const accessLevelRequired = (req, res, accessLevel, next) => {
  if (req.user.accessLevel >= accessLevel) {
    next();
  } else {
    res.status(401).json({
      message: "You don't have the access level to perform this operation.",
    });
  }
};

const director = (req, res, next) => {
  checkedUser(req, res);
  accessLevelRequired(req, res, 4, next);
};

const manager = (req, res, next) => {
  checkedUser(req, res);
  accessLevelRequired(req, res, 3, next);
};

const senior = (req, res, next) => {
  checkedUser(req, res);
  accessLevelRequired(req, res, 2, next);
};

const rcw = (req, res, next) => {
  checkedUser(req, res);
  accessLevelRequired(req, res, 1, next);
};

module.exports = { director, manager, senior, rcw };
