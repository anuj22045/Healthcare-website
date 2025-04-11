const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  dob: Date,
  age: Number,
  gender: String,
  phone: String,
  address: String,
  height: String,
  weight: String,
  bloodGroup: String,
  allergies: String,
  medicalHistory: String,
  isApproved: {
    type: Boolean,
    default: false, // all doctors are unapproved by default
  },
});

module.exports = mongoose.model("User", userSchema);
