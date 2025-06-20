import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './RegisterPage.css';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

const validateEmail = (email) => {
  const isValid = /^[^\s@]+@gmail\.com$/.test(email);
  setEmailError(isValid ? '' : 'Please enter a valid Gmail address (e.g., yourname@gmail.com).');
  return isValid;
};

const handleRegister = async () => {
    if (!username || !email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter valid email')
      return;
    } 
    try {
      const newUser = {
        userName: username,
        mail: email,
        password: password,
        bio: bio
      };

      console.log('Register attempt:', newUser);
      const response = await axios.post('http://localhost:8085/addUser', newUser);

      console.log('Registration Successful: ', response.data);

      alert(`🎉 Welcome ${username}! Check your Gmail for a welcome message.`);
      navigate('/'); // Redirect to login page
    } catch (error) {
      if (
        error.response?.data?.includes("Duplicate") ||
        error.response?.status === 500
      ) {
        alert("This email is already registered. Please log in.");
      } else {
        alert("Registration failed. Please try again later.");
      }
      console.error('Registration failed:', error);
    }
    /*
    try {
      const newUser = {
        userName: username,
        mail: email,
        password: password,
        bio: bio
      };
      console.log('Register attempt:', newUser);
      const response = await axios.post('http://localhost:8085/addUser', newUser);
      console.log('Registration Successful: ', response.data);
      navigate('/');
    } catch (error) {
      console.error('Registration Failed.', error);
    }*/
  };

  return (
    <div className="register-page">
      <div className="logosection-reg">
        <img src={logo} alt="Logo" className="logoimage-reg" />
      </div>
      <div className="register-form-container">
        <div className="register-box">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email ID (only Gmail)"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            className="register-input"
          />
          {emailError && <p className="error-text">{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <button
            onClick={handleRegister}
            className="register-button"
            disabled={!username || !email || !password}
          >
            Register
          </button>
          <p className="register-link-text">
            Already have an account?{' '}
            <span
              className="register-link-span"
              onClick={() => navigate('/')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
