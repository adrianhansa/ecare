const router = require("express").Router();
const {
  addServiceUser,
  updateServiceUser,
  getServiceUser,
  getServiceUsers,
  deleteServiceUser,
} = require("../controllers/serviceUserController");
const { manager } = require("../middlewares/auth");
const service = require("../middlewares/service");

router.post("/:service", manager, service, addServiceUser);
router.get("/:service", manager, service, getServiceUsers);
router.get("/:service/:id", manager, service, getServiceUser);
router.put("/:service/:id", manager, service, updateServiceUser);
router.delete("/:id", manager, deleteServiceUser);

module.exports = router;
