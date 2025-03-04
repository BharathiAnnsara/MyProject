const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  doctorId: { type: String, required: true, unique: true, trim: true },
  dob: { type: Date, required: true },
  adminHospital: { type: String, required: true, trim: true },
  specialization: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ 
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    match: /^[0-9]{10}$/  // Ensures a 10-digit phone number
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor"], default: "doctor" },
  licenseBase64: { type: String, required: true }, // Consider external storage for large files
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
