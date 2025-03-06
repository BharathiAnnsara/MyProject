import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelectionPage from "./components/RoleSelectionPage";
import PatientSignupPage from "./components/PatientSignupPage";
import DoctorSignupPage from "./components/DoctorSignupPage";
<<<<<<< HEAD
import AdminSignupPage from "./components/AdminSignupPage"; // ✅ Admin Signup
import AdminLoginPage from "./components/AdminLoginPage"; // ✅ Admin Login
=======
import AdminSignupPage from "./components/AdminSignupPage";
import AdminLoginPage from "./components/AdminLoginPage";
>>>>>>> f7bd6d86517cddc63455885daa02a22ecd6f4401
import LoginPage from "./components/LoginPage";
import PatientDocumentUpload from "./components/PatientDocumentUpload";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RoleSelectionPage />} />
        <Route path="/signup/patient" element={<PatientSignupPage />} />
        <Route path="/signup/doctor" element={<DoctorSignupPage />} />
<<<<<<< HEAD
        <Route path="/signup/admin" element={<AdminSignupPage />} /> {/* ✅ Admin Signup */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} /> {/* ✅ Admin Login */}
=======
        <Route path="/signup/admin" element={<AdminSignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
>>>>>>> f7bd6d86517cddc63455885daa02a22ecd6f4401
        <Route path="/upload-document" element={<PatientDocumentUpload />} />

        {/* Dashboard Routes */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
