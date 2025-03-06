import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
<<<<<<< HEAD
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
=======
      setError(err.response?.data?.message || 'Signup failed. Please try again.');//try not again
>>>>>>> f7bd6d86517cddc63455885daa02a22ecd6f4401
    }
  };

  return (
    <div>
      <h1>Admin Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Hospital Name"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Signup</button>
      </form>
      <p>
<<<<<<< HEAD
        Already have an account? <a href="/admin-login">Login</a> {/* ✅ Updated Link */}
=======
        Already have an account? <a href="/admin-login">Login</a>
>>>>>>> f7bd6d86517cddc63455885daa02a22ecd6f4401
      </p>
    </div>
  );
};

export default AdminSignupPage;
