const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Admin = require("../models/Admin"); // ✅ Import Admin model

const router = express.Router();

// Configure Multer to store file data in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

// Unified Signup Endpoint for Doctors and Patients
router.post("/signup", upload.single("license"), async (req, res) => {
  try {
    console.log("Received signup request:", req.body); // Debugging

    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }

    if (role === "doctor") {
      // --- Doctor Signup ---
      const { firstName, lastName, doctorId, dob, adminHospital, specialization, email, phone, password } = req.body;

      // Check if doctor already exists
      const existingDoctor = await Doctor.findOne({ email });
      if (existingDoctor) {
        return res.status(400).json({ message: "Doctor already registered with this email." });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Convert uploaded license file to Base64
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
        role: "doctor",
        licenseBase64,
      });

      await newDoctor.save();
      return res.status(201).json({ message: "Doctor registered successfully!" });

    } else if (role === "patient") {
      // --- Patient Signup ---
      const { firstName, lastName, dob, email, phone, address, password } = req.body;

      // Check if patient already exists
      const existingPatient = await Patient.findOne({ email });
      if (existingPatient) {
        return res.status(400).json({ message: "Patient already registered with this email." });
      }

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
        role: "patient",
      });

      await newPatient.save();
      return res.status(201).json({ message: "Patient registered successfully!" });
    } else {
      return res.status(400).json({ message: "Invalid role provided." });
    }
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Registration failed. Please try again." });
  }
});

// **Admin Signup Route**
router.post("/admin-signup", async (req, res) => {
  try {
    const { hospitalName, adminId, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered with this email." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new admin
    const newAdmin = new Admin({
      hospitalName,
      adminId,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    return res.status(201).json({ message: "Admin registered successfully!" });
  } catch (error) {
    console.error("Admin Signup Error:", error);
    return res.status(500).json({ message: "Signup failed. Please try again." });
  }
});

// **Login Endpoint for Doctors, Patients, and Admins**
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(`Login request received for: ${email} as ${role}`);

    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }

    let user;
    let redirectUrl = "";

    if (role === "doctor") {
      user = await Doctor.findOne({ email });
      redirectUrl = "/doctor-dashboard";
    } else if (role === "patient") {
      user = await Patient.findOne({ email });
      redirectUrl = "/patient-dashboard";
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
      redirectUrl = "/admin-dashboard";
    } else {
      return res.status(400).json({ message: "Invalid role provided." });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful!", token, redirectUrl });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Login failed. Please try again." });
  }
});

module.exports = router;
