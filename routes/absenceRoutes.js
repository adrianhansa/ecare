const router = require("express").Router();
const { senior, manager } = require("../middlewares/auth");
const service = require("../middlewares/service");
const {
  addAbsence,
  updateAbsence,
  deleteAbsence,
  getAbsence,
  getAbsencesByDates,
  getAbsencesByEmployee,
} = require("../controllers/absenceController");

router.post("/:service", senior, service, addAbsence);
router.get(
  "/by-employee/:employee/:startDate/:endDate",
  manager,
  getAbsencesByEmployee
);
router.get(
  "/:service/:startDate/:endDate",
  manager,
  service,
  getAbsencesByDates
);
router.get("/:id", senior, getAbsence);
router.put("/:id", senior, updateAbsence);
router.delete("/:id", manager, deleteAbsence);

module.exports = router;
