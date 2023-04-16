const Employee = require("../models/employeeModel");
const createError = require("http-errors");
const path = require('path')

// add new doc to the DB and is the last param of "post" in the "Product" route
const createEmployee = (req, res, next) => {
  const newEmployee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: new Date(req.body.birthday),
    gender: req.body.gender,
    phone: req.body.phone,
    state: req.body.state,
    company: req.body.company,
    role: req.body.role,
    nationalID: req.body.nationalID,
  });

  newEmployee
    .save()
    .then((savedEmployee) => {
      return res.json(savedEmployee);
    })
    .catch((err) => {
      return next(createError(500, err.message));
    });
};

const getAllEmployees = (req, res, next) => {
  Employee.find({}, { __v: 0 }).sort({"lastName": 1})
    .then((employees) => {
      res.locals.title = "Home";
      console.log(__dirname);
      res.render(path.join(__dirname, "../views/home.ejs"), { list: employees });
    })
    .catch((err) => {
      return next(createError(500, err.message));
    });
};

const getProfile = (req, res, next) => {
  res.locals.title = "Profile";
  res.render(path.join(__dirname, "../views/profile.ejs"), { profile: req.profile });
  next();
};

const deleteProfile = (req, res, next) => {
  console.log("fs");
  Employee.findByIdAndDelete(req.profile.id)
    .then(() => {
      res.redirect("http://localhost:3000/employee/readAll");
    })
    .catch((err) => {
      return next(createError(500, err.message));
    });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getProfile,
  deleteProfile,
};
