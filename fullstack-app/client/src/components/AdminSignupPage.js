import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
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
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      console.error('Signup Error:', err.response ? err.response.data : err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');//try not again
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
        Already have an account? <a href="/admin-login">Login</a>
      </p>
    </div>
  );
};

export default AdminSignup;
