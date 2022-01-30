const router = require("express").Router();
const { manager, rcw } = require("../middlewares/auth");
const service = require("../middlewares/service");
const {
  addItem,
  updateItem,
  deleteItem,
  getItem,
  getItems,
  toggleStatus,
} = require("../controllers/dailyObservationItemsController");

router.post("/:service", manager, service, addItem);
router.get("/:service", rcw, service, getItems);
router.put("/toggle/:id", manager, toggleStatus);
router.get("/:id", rcw, getItem);
router.put("/:id", manager, updateItem);
router.delete("/:id", rcw, deleteItem);

module.exports = router;
