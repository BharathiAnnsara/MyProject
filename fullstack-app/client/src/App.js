import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelectionPage from "./components/RoleSelectionPage";
import PatientSignupPage from "./components/PatientSignupPage";
import DoctorSignupPage from "./components/DoctorSignupPage";
import AdminSignupPage from "./components/AdminSignupPage";
import AdminLoginPage from "./components/AdminLoginPage";
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
        <Route path="/signup/admin" element={<AdminSignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
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
