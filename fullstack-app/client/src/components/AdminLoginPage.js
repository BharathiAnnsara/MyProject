import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:5000/api/auth/admin-login', {
        email,
        password,
      });

      const { token, role } = response.data;

      // Store token and role in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect to admin dashboard
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Admin Login Error:', err.response ? err.response.data : err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
