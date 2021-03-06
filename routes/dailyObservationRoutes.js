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
  findRecord,
  getRecordsByResident,
} = require("../controllers/dailyObservationController");

router.post("/:service", rcw, service, addRecord);
router.get("/:service/:id", rcw, service, getRecord);
router.put("/:id", rcw, updateRecord);
router.delete("/:id", manager, deleteRecord);
router.get("/:serviceUser", manager, getRecordsByResident);
router.get("/:service/:date", rcw, service, getRecordsByDay);
router.get("/:service/:startDate/:endDate", rcw, service, getRecordsByInterval);
router.put("/archive/:id", manager, service, archiveRecord);
router.put("/reactivate/:id", manager, service, reactivateRecord);
router.get("/:service/:date/:shift/:serviceUser", rcw, service, findRecord);

module.exports = router;
