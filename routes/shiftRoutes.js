const router = require("express").Router();
const { manager } = require("../middlewares/auth");
const {
  addShift,
  updateShift,
  deleteShift,
  getShift,
  getShifts,
} = require("../controllers/shiftController");

router.post("/", manager, addShift);
router.get("/", manager, getShifts);
router.get("/:id", manager, getShift);
router.put("/:id", manager, updateShift);
router.delete("/:id", manager, deleteShift);

module.exports = router;
