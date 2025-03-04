const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  adminId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" } // ✅ Added role field
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
