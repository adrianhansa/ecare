const router = require("express").Router();
const { rcw, senior } = require("../middlewares/auth");
const service = require("../middlewares/service");
const {
  addCommunication,
  updateCommunication,
  deleteCommunication,
  getCommunication,
  getCommunications,
} = require("../controllers/communicationController");

router.post("/:service", rcw, service, addCommunication);
router.get("/:service", rcw, service, getCommunications);
router.get("/:id", rcw, getCommunication);
router.put("/:id", rcw, updateCommunication);
router.delete("/:id", senior, deleteCommunication);

module.exports = router;
