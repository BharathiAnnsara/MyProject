const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const router = express.Router();

// Configure Multer to store file data in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Unified signup endpoint for both doctors and patients
router.post("/signup", upload.single("license"), async (req, res) => {
  try {
    const { role } = req.body;
    if (role === "doctor") {
      // --- Doctor Signup ---
      const { firstName, lastName, doctorId, dob, adminHospital, specialization, email, phone, password } = req.body;

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Convert the uploaded license file to Base64; for doctors, this field is required.
      const licenseBase64 = req.file ? req.file.buffer.toString("base64") : undefined;
      if (!licenseBase64) {
        return res.status(400).json({ message: "License file is required for doctors." });
      }

      const newDoctor = new Doctor({
        firstName,
        lastName,
        doctorId,
        dob,
        adminHospital,
        specialization,
        email,
        phone,
        password: hashedPassword,
        licenseBase64
      });

      await newDoctor.save();
      return res.status(201).json({ message: "Doctor registered successfully!" });
    } else if (role === "patient") {
      // --- Patient Signup ---
      const { firstName, lastName, dob, email, phone, address, password } = req.body;

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const newPatient = new Patient({
        firstName,
        lastName,
        dob,
        email,
        phone,
        address,
        password: hashedPassword,
        role: "patient"
      });

      await newPatient.save();
      return res.status(201).json({ message: "Patient registered successfully!" });
    } else {
      return res.status(400).json({ message: "Invalid role provided." });
    }
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(400).json({ message: "Registration failed. Please check the input data." });
  }
});

module.exports = router;
