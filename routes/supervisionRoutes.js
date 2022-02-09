const router = require("express").Router();
const {
  addSupervision,
  updateSupervision,
  getSupervision,
  getSupervisions,
  deleteSupervision,
  getSupervisionsBySupervisee,
  getSupervisionsBySupervisor,
  getLatestSupervision,
} = require("../controllers/supervisionController");
const { manager } = require("../middlewares/auth");
const service = require("../middlewares/service");

router.post("/:service", manager, service, addSupervision);
router.get("/:service", manager, service, getSupervisions);
router.get(
  "/:service/:supervisee",
  manager,
  service,
  getSupervisionsBySupervisee
);
router.get(
  "/:service/:supervisor",

  manager,
  service,
  getSupervisionsBySupervisor
);
router.get("/:id", manager, getSupervision);
router.put("/:id", manager, updateSupervision);
router.get("/:supervisee", manager, getLatestSupervision);
router.delete("/:id", manager, deleteSupervision);

module.exports = router;
