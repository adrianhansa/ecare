const router = require("express").Router();
const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getAllEmployees,
  getEmployees,
} = require("../controllers/employeeController");
const { manager } = require("../middlewares/auth");

router.post("/:service", manager, addEmployee);
router.get("/:service", manager, getEmployees);
router.get("/all", manager, getAllEmployees);
router.get("/:id", manager, getEmployee);
router.put("/:id", manager, updateEmployee);
router.delete("/:id", manager, deleteEmployee);

module.exports = router;
