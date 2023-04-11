const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    birthday: {
      type: Date,
      required: true,
    },
    nationalID: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "not set"],
      default: "not set",
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Split the input string by comma and trim each phone number
          const phoneNumbers = v.split(",").map((p) => p.trim());
          
          // Check each phone number in the array
          for (const phoneNumber of phoneNumbers) {
            if (!/^\+98[0-9]{10}$/.test(phoneNumber)) {
              return false; // Invalid phone number format
            }
          }
          
          return true; // All phone numbers are valid
        },
      },
    },
    state: {
      type: String,
      trim: true,
      enum: ["qazvin", "tehran", "alborz", "not set"],
      default: "not set",
      lowercase: true // this line will convert the user input to lowercase

    },
    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    role: {
      type: String,
      trim: true,
      enum: ["employee", "manager"],
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee", EmployeeSchema);
