const router = require("express").Router();
const {
  addWorkingStatus,
  updateWorkingStatus,
  deleteWorkingStatus,
  getWorkingStatus,
  getWorkingStatuses,
} = require("../controllers/workingStatusController");
const { manager } = require("../middlewares/auth");

router.post("/", manager, addWorkingStatus);
router.get("/", manager, getWorkingStatuses);
router.get("/:id", manager, getWorkingStatus);
router.put("/:id", manager, updateWorkingStatus);
router.delete("/:id", manager, deleteWorkingStatus);

module.exports = router;
