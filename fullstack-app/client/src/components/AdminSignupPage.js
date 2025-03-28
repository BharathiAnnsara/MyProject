import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/AdminSignup.css';

const AdminSignupPage = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [adminId, setAdminId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/admin-signup', {
        hospitalName,
        adminId,
        email,
        password,
      });

      alert(response.data.message);
      navigate('/admin-login'); // ✅ Redirecting to AdminLoginPage
    } catch (err) {
      console.error('Signup Error:', err.response ? err.response.data : err);

      setError(err.response?.data?.message || 'Signup failed. Please try again.');//try not again

    }
  };

  return (

    <div className="admin-signup-container">
      <div className="admin-signup-card">
        <h1 className="admin-signup-title">Admin Signup</h1>
        <form onSubmit={handleSignup} className="admin-signup-form">
          <input
            type="text"
            placeholder="Hospital Name"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Signup</button>
        </form>
        <p className="signup-links">
          Already have an account? <a href="/admin-login">Login</a>
        </p>
      </div>

    </div>
  );
};

export default AdminSignupPage;
