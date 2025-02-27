import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientSignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agree) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const formData = {
      firstName,
      lastName,
      dob,
      email,
      phone,
      address,
      password,
      role: 'patient',
    };

    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/upload-document');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Signup failed');
    }
  };

  return (
    <div>
      <h1>Patient Signup</h1>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <label>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          I agree to the terms and conditions
        </label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {error && <p>{error}</p>}
        <button type="submit">Signup</button>
      </form>
      
      {/* Login Option */}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default PatientSignupPage;
