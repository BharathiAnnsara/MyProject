import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/styles/LoginPage.css"; // Import CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Login attempt:", { email, password, role }); // Debugging

    if (!role) {
      setError("Please select a role.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      });

      console.log("Login Response:", response.data); // Debugging

      const { token, redirectUrl } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate(redirectUrl);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="links">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
