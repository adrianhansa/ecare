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
router.get("/get-employee/:id", manager, getEmployee);
router.get("/all", manager, getAllEmployees);
router.put("/:id", manager, updateEmployee);
router.delete("/:id", manager, deleteEmployee);

module.exports = router;
