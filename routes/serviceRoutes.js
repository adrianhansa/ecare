const router = require("express").Router();
const {
  addService,
  getService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { director, manager, senior, rcw } = require("../middlewares/auth");

router.get("/", senior, getServices);
router.post("/", director, addService);
router.get("/:id", rcw, getService);
router.put("/:id", manager, updateService);
router.delete("/:id", director, deleteService);

module.exports = router;
