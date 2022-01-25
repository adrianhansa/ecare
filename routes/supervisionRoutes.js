const router = require("express").Router();
const {
  addSupervision,
  updateSupervision,
  getSupervision,
  getSupervisions,
  deleteSupervision,
  getSupervisionsBySupervisee,
  getSupervisionsBySupervisor,
} = require("../controllers/supervisionController");
const { manager } = require("../middlewares/auth");
const service = require("../middlewares/service");

router.post("/:service", service, manager, addSupervision);
router.get("/:service", service, manager, getSupervisions);
router.get(
  "/:service/:supervisee",
  service,
  manager,
  getSupervisionsBySupervisee
);
router.get(
  "/:service/:supervisor",
  service,
  manager,
  getSupervisionsBySupervisor
);
router.get("/:id", manager, getSupervision);
router.put("/:id", manager, updateSupervision);
router.delete("/:id", manager, deleteSupervision);

module.exports = router;
