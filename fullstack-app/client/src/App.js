import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelectionPage from "./components/RoleSelectionPage";
import PatientSignupPage from "./components/PatientSignupPage";
import DoctorSignupPage from "./components/DoctorSignupPage";
import AdminSignupPage from "./components/AdminSignupPage"; // ✅ Import AdminSignupPage
import LoginPage from "./components/LoginPage";
import PatientDocumentUpload from "./components/PatientDocumentUpload";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelectionPage />} />
        <Route path="/signup" element={<RoleSelectionPage />} />
        <Route path="/signup/patient" element={<PatientSignupPage />} />
        <Route path="/signup/doctor" element={<DoctorSignupPage />} />
        <Route path="/signup/admin" element={<AdminSignupPage />} /> {/* ✅ Added admin signup route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload-document" element={<PatientDocumentUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
