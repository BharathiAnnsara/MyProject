import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorSignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [dob, setDob] = useState("");
  const [adminHospital, setAdminHospital] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicense(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("doctorId", doctorId);
    formData.append("dob", dob);
    formData.append("adminHospital", adminHospital);
    formData.append("specialization", specialization);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", "doctor"); // ✅ Fix: Adding role explicitly
    if (license) {
      formData.append("license", license);
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Doctor Signup</h1>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="text" placeholder="Doctor ID" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
        <input type="text" placeholder="Admin Hospital" value={adminHospital} onChange={(e) => setAdminHospital(e.target.value)} required />
        <input type="text" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="file" onChange={handleFileUpload} accept="image/*,.pdf" required />
        <label>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          I agree to the terms and conditions
        </label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {error && <p>{error}</p>}
        <button type="submit">Signup</button>
      </form>

      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default DoctorSignupPage;
