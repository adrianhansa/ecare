const router = require("express").Router();
const {
  getWorkShiftsByInterval,
  addWorkShift,
  getWorkShiftsByDay,
  getWorkShift,
  updateWorkShift,
  deleteWorkShift,
  getShiftsByEmployeeByDay,
} = require("../controllers/workShiftController");
const { manager } = require("../middlewares/auth");
const service = require("../middlewares/service");

router.post("/:service/", manager, service, addWorkShift);
router.get("/:service/:day", manager, service, getWorkShiftsByDay);
router.get("/:service/:id", manager, service, getWorkShift);
router.put("/:id", manager, updateWorkShift);
router.delete("/:service/:id", manager, service, deleteWorkShift);
router.get("/:service/:start/:end", manager, service, getWorkShiftsByInterval);
router.get(
  "/:service/:employee/:day",
  manager,
  service,
  getShiftsByEmployeeByDay
);
module.exports = router;
