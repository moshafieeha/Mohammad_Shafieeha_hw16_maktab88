const express = require("express");
const router = express.Router();
// controllers
const {
  createEmployee,
  getAllEmployees,
  getProfile,
  deleteProfile,
} = require("../controllers/employeeController");
// middlewares
const {
  createEmployeeValidator,
  profileValidator,
} = require("../middlewares/validator/emplooyeValidator");

router.post("/create", createEmployeeValidator, createEmployee);
router.get("/readAll", getAllEmployees);
router.get("/readOne/:id", profileValidator, getProfile);
router.delete("/deleteOne/:id", profileValidator, deleteProfile);

module.exports = router;
