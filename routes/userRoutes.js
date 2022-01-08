const router = require("express").Router();
const { register, login, logout } = require("../controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
