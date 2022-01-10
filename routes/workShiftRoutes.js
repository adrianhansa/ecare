const router = require("express").Router();
const {
  getWorkShiftsByInterval,
  addWorkShift,
  getWorkShiftsByDay,
  getWorkShift,
  updateWorkShift,
  deleteWorkShift,
} = require("../controllers/workShiftController");
const { manager } = require("../middlewares/auth");

router.post("/", manager, addWorkShift);
router.get("/:day", manager, getWorkShiftsByDay);
router.get("/:id", manager, getWorkShift);
router.put("/:id", manager, updateWorkShift);
router.delete("/:id", manager, deleteWorkShift);
router.get("/:start/:end", manager, getWorkShiftsByInterval);

module.exports = router;
