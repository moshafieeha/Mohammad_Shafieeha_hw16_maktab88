const createError = require("http-errors");
const EmployeeSchema = require("../../models/employeeModel");
const mongoose = require("mongoose");

// the validation step on the backend side
const createEmployeeValidator = (req, res, next) => {
  // Check for any unknown fields in the request body
  const validFields = Object.keys(EmployeeSchema.schema.obj);
  const unknownFields = Object.keys(req.body).filter(
    (field) => !validFields.includes(field)
  );
  if (unknownFields.length > 0) {
    return next(
      createError(
        400,
        `Invalid field(s) in request body: ${unknownFields.join(", ")}`
      )
    );
  }

  // check duplication
  const phones = req.body.phone.split(",").map((p) => p.trim());
  const duplicateEmplooyee = EmployeeSchema.find({
    $or: [
      { nationalID: req.body.nationalID },
      { phone: { $in: phones } }
    ]
  });
  if (duplicateEmplooyee.length > 0) {
    return next(createError(409, "Conflict, employee already exists."));
  }

  // Check if firstName field is present and valid
  if (!req.body.firstName || typeof req.body.firstName !== "string") {
    return next(createError(400, "Invalid or missing 'firstName' field"));
  }
  const firstName = req.body.firstName.trim();
  if (firstName.length < 3 || firstName.length > 30) {
    return next(
      createError(400, "'firstName' must be between 3 and 30 characters long")
    );
  }

  // Check if lastName field is present and valid
  if (!req.body.lastName || typeof req.body.lastName !== "string") {
    return next(createError(400, "Invalid or missing 'lastName' field"));
  }
  const lastName = req.body.lastName.trim();
  if (lastName.length < 3 || lastName.length > 30) {
    return next(
      createError(400, "'lastName' must be between 3 and 30 characters long")
    );
  }

  // Check if birthday field is present and valid
  if (!req.body.birthday || !Date.parse(req.body.birthday)) {
    return next(createError(400, "Invalid or missing 'birthday' field"));
  }
  const birthday = new Date(req.body.birthday);

  // Check if nationalID field is present and valid
  if (
    !req.body.nationalID ||
    !/^\d{10}$/.test(req.body.nationalID.toString())
  ) {
    return next(createError(400, "Invalid or missing 'nationalID' field"));
  }
  const nationalID = req.body.nationalID.toString();

  // Check if gender field is present and valid
  let gender = "not set";
  if (req.body.gender) {
    if (typeof req.body.gender !== "string") {
      return next(createError(400, "Invalid 'gender' field"));
    }
    const inputGender = req.body.gender.trim().toLowerCase();
    if (inputGender !== "male" && inputGender !== "female") {
      return next(createError(400, "Invalid 'gender' field"));
    }
    gender = inputGender;
  }

  // Check if phone field is present and valid
  if (!req.body.phone || typeof req.body.phone !== "string") {
    return next(createError(400, "Invalid or missing 'phone' field"));
  }
  const inputPhone = req.body.phone.trim();
  const phoneNumbers = inputPhone.split(",");
  for (const phoneNumber of phoneNumbers) {
    if (!/^\+98[0-9]{10}$/.test(phoneNumber.trim())) {
      return next(createError(400, "Invalid 'phone' field"));
    }
  }
  const phone = inputPhone;

  // Check if state field is present and valid
  let state = "not set";
  if (req.body.state) {
    if (typeof req.body.state !== "string") {
      return next(createError(400, "Invalid 'state' field"));
    }
    const inputState = req.body.state.trim().toLowerCase();
    if (
      inputState !== "qazvin" &&
      inputState !== "tehran" &&
      inputState !== "alborz"
    ) {
      return next(createError(400, "Invalid 'state' field"));
    }
    state = inputState;
  }

  // Check if company field is present and valid
  if (!req.body.company || typeof req.body.company !== "string") {
    return next(createError(400, "Invalid or missing 'company' field"));
  }
  const company = req.body.company.trim();
  if (company.length < 3 || company.length > 30) {
    return next(
      createError(400, "'Company' must be between 3 and 30 characters long")
    );
  }

  // Check if role field is present and valid
  let role = "employee";
  if (req.body.state) {
    if (typeof req.body.role !== "string") {
      return next(createError(400, "Invalid 'role' field"));
    }
    const inputRole = req.body.role.trim().toLowerCase();
    if (inputRole !== "manager" && inputRole !== "employee") {
      return next(createError(400, "Invalid 'role' field"));
    }
    role = inputRole;
  }

  next();
};

const profileValidator = (req, res, next) => {
  console.log("kkk");

  if (!req.params.id) {
    return res.status(400).send("Profile ID is missing");
  }
  const objectId = mongoose.Types.ObjectId(req.params.id);
  EmployeeSchema.findById(objectId)
    .then((profile) => {
      if (!profile) {
        return res.status(404).send("Profile not found");
      }
      req.profile = profile;
      next();
    })
    .catch(next);
};

// function createEmployeeValidator(req, res, next) {
//   // validation
//   // check null object
//   if (Object.keys(req.body).length === 0) {
//     return next(createError(406, err.message));
//   }

//   // sanitization
//   const pattern = [
//     "firstName",
//     "lastName",
//     "birthday",
//     "nationalID",
//     "gender",
//     "phone",
//     "state",
//     "company",
//     "role",
//   ];

//   // check the right length of object
//   if (pattern.length !== Object.keys(req.body).length) {
//     return next(createError(406, "Object length  is not acceptable"));
//   }

//   // check the null value and right properties
//   for (const key in req.body) {
//     if (!req.body[key] || !pattern.includes(key))
//       return next(createError(406, `Not acceptable, invalid input (${key})`));
//   }

//   // check duplication
//   // Split the phone numbers in the request body by comma and trim each phone number
//   const phoneNumbers = req.body.phone.split(",").map((p) => p.trim());

//   const duplicateEmplooyee = EmployeeSchema.find({
//     $and: [
//       { nationalID: req.body.nationalID },
//       { phone: { $in: phoneNumbers } }
//     ]
//   });

//   if (duplicateEmplooyee.length > 0) {
//     return next(createError(409, "Conflict, employee already exists."));
//   }

//   // checking data types
//   const expectedTypes = {
//     firstName: "string",
//     lastName: "string",
//     birthday: "string",
//     nationalID: "number",
//     gender: "string",
//     phone: "string",
//     // /^\+98[0-9]{10}$/
//     state: "string",
//     company: "string",
//     role: "string",
//   };

//   for (const [key, value] of Object.entries(req.body)) {
//     const expectedType = expectedTypes[key];

//     if (
//       !expectedType ||
//       (expectedType instanceof RegExp && !expectedType.test(value)) ||
//       typeof value !== expectedType
//     ) {
//       return next(createError(400, `${key} should be of type ${expectedType}`));
//     }
//   }

//   // check the ceraiteria for each param
//   if (req.body.firstName.length >30 || req.body.firstName.length < 3) {
//     return next(
//       createError(400, "FirstName length must be between 3 and 100!")
//     );
//   }

//   // // position validations
//   // if (!req.body.position) {
//   //   return res.status(400).send("Position is required!");
//   // }
//   // if (
//   //   ![
//   //     "Backend Developer",
//   //     "Client Developer",
//   //     "Devops",
//   //     "UI/UX Designer",
//   //   ].includes(req.body.position)
//   // ) {
//   //   return res.status(400).send("Bad value for position!");
//   // }

//   next();
// }

module.exports = { createEmployeeValidator, profileValidator };
