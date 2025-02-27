const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
  dob: Date,
  bloodGroup: String,
  gender: String,
  role: { type: String, enum: ['doctor', 'patient'] },
});

module.exports = mongoose.model('User', userSchema);
