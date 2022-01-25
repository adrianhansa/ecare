const router = require("express").Router();
const {
  addAppraisal,
  updateAppraisal,
  getAppraisal,
  getAppraisals,
  deleteAppraisal,
} = require("../controllers/appraisalController");
const { manager } = require("../middlewares/auth");
const service = require("../middlewares/service");

router.post("/:service", service, manager, addAppraisal);
router.get("/:service", service, manager, getAppraisals);
router.get("/:id", manager, getAppraisal);
router.put("/:id", manager, updateAppraisal);
router.delete("/:id", manager, deleteAppraisal);

module.exports = router;
