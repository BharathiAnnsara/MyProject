import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/AdminLogin.css';
const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        role: 'admin',
      });

      const { token, role } = response.data;

      // Store token and role in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect to admin dashboard
      navigate('/admin-dashboard');

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="admin-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-input"
          />
          {error && <p className="admin-error">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="admin-btn"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
