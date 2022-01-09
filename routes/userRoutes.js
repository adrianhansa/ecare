const router = require("express").Router();
const {
  register,
  login,
  employeeLogin,
  logout,
} = require("../controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.post("/employee-login", employeeLogin);
router.get("/logout", logout);

module.exports = router;
