const router = require("express").Router();
const { manager } = require("../middlewares/auth");
const service = require("../middlewares/service");
const {
  addShift,
  updateShift,
  deleteShift,
  getShift,
  getShifts,
} = require("../controllers/shiftController");

router.post("/:service", manager, service, addShift);
router.get("/:service", manager, service, getShifts);
router.get("/:id", manager, getShift);
router.put("/:id", manager, updateShift);
router.delete("/:id", manager, deleteShift);

module.exports = router;
