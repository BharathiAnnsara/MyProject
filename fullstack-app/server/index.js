const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const Doctor = require('./models/Doctor'); // Import Doctor model
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer Setup for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medicalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

// Signup Route with Image Upload
app.post('/api/auth/signup', upload.single('license'), async (req, res) => {
  try {
    const { firstName, lastName, doctorId, dob, adminHospital, specialization, email, phone, password } = req.body;

    // Convert license file to Base64
    let licenseBase64 = '';
    if (req.file) {
      licenseBase64 = req.file.buffer.toString('base64');
    }

    // Create new Doctor record
    const newDoctor = new Doctor({
      firstName,
      lastName,
      doctorId,
      dob,
      adminHospital,
      specialization,
      email,
      phone,
      password, // You should hash the password before saving
      license: licenseBase64, // Only storing the image in Base64
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor registered successfully!' });

  } catch (error) {
    res.status(500).json({ message: 'Error registering doctor', error });
  }
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
