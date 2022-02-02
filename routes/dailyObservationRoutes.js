const router = require("express").Router();
const { rcw, manager } = require("../middlewares/auth");
const service = require("../middlewares/service");
const {
  addRecord,
  updateRecord,
  deleteRecord,
  getRecord,
  getRecordsByDay,
  getRecordsByInterval,
  archiveRecord,
  reactivateRecord,
} = require("../controllers/dailyObservationController");

router.post("/:service", rcw, service, addRecord);
router.get("/:service/:id", rcw, service, getRecord);
router.put("/:id", rcw, service, updateRecord);
router.delete("/:id", manager, service, deleteRecord);
router.get("/:service/:date", rcw, service, getRecordsByDay);
router.get("/:service/:startDate/:endDate", rcw, service, getRecordsByInterval);
router.put("/archive/:id", manager, service, archiveRecord);
router.put("/reactivate/:id", manager, service, reactivateRecord);

module.exports = router;
