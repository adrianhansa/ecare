const router = require("express").Router();
const { manager } = require("../middlewares/auth");
const service = require("../middlewares/service");
const {
  addAnnualLeaveEntitlement,
  updateAnnualLeaveEntitlement,
  deleteAnnualLeaveEntitlement,
  getAnnualLeavePerEmployeeAllTimes,
  getAnnualLeavePerEmployeePerYear,
  getAnnualLeaveRequests,
  recordAnnualLeaveRequest,
  addAnnualLeavePerServicePerYear,
  addAnnualLeavePerServiceAllTimes,
  updateAnnualLeaveRequest,
  deleteAnnualLeaveRequest,
} = require("../controllers/annualLeaveController");

router.post;

module.exports = router;
