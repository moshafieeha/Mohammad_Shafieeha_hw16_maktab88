const express = require("express");
const router = express.Router();
// middlewares
const { RequiredMiddleware } = require("../middlewares/validator/renderValidator");
const { createEmployee, getAllEmployees } = require("../controllers/employeeController");

employees = 

// show all cards in the home page
router.post("/home", (req, res, next) => {
    res.locals.title = "Home";
    res.render("home", { list: employees });
    next()
  });

module.exports = router;
