const router = require("express").Router();
const service = require("../middlewares/service");
const { manager } = require("../middlewares/auth");
const {
  addOnCallLog,
  updateOnCallLog,
  deleteOnCallLog,
  getOnCallLog,
  getAllOnCallLogs,
  getOnCallLogByService,
} = require("../controllers/onCallLogController");

router.post("/", manager, addOnCallLog);
router.get("/", manager, getAllOnCallLogs);
router.get("/:service", service, manager, getOnCallLogByService);
router.get("/:id", manager, getOnCallLog);
router.put("/:id", manager, updateOnCallLog);
router.delete("/:id", manager, deleteOnCallLog);

module.exports = router;
