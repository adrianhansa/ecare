const router = require("express").Router();
const {
  addHandoverEntry,
  updateHandoverEntry,
  getHandoverEntries,
  getHandoverEntriesByServiceUser,
  getHandoverEntry,
  deleteHandoverEntry,
} = require("../controllers/handoverController");
const { rcw } = require("../middlewares/auth");
const service = require("../middlewares/service");

router.post("/:service", rcw, service, addHandoverEntry);
router.get("/:service", rcw, service, getHandoverEntries);
router.get("/:serviceUser", rcw, service, getHandoverEntriesByServiceUser);
router.get("/:id", rcw, getHandoverEntry);
router.put("/:id", rcw, updateHandoverEntry);
router.delete("/:id", rcw, deleteHandoverEntry);

module.exports = router;
