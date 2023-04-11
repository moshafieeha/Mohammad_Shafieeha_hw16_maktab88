const express = require("express");
const router = express.Router();
// controllers
const { createEmployee, getAllEmployees, getProfile } = require("../controllers/employeeController");
// middlewares
const { createEmployeeValidator, profileValidator } = require("../middlewares/validator/emplooyeValidator");



router.post("/create",createEmployeeValidator, createEmployee);
router.get("/read", getAllEmployees)
router.get("/profile/:id", profileValidator, getProfile)



module.exports = router;