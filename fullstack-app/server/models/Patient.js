const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  address: String,
  password: String,
  role: { type: String, default: "patient" }
});

module.exports = mongoose.model("Patient", patientSchema);
