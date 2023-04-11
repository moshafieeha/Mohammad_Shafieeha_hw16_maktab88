const express = require("express");
const router = express.Router();
// controllers
const { createEmployee, getAllEmployees, getProfile } = require("../controllers/employeeController");
// middlewares
const { createEmployeeValidator, profileValidator } = require("../middlewares/validator/emplooyeValidator");



router.post("/create",createEmployeeValidator, createEmployee);
router.get("/readAll", getAllEmployees)
router.get("/readOne/:id", profileValidator, getProfile)



module.exports = router;