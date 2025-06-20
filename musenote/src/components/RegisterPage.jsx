import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './RegisterPage.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.error('Please fill in all required fields.', { position: 'top-center' });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid Gmail address.', { position: 'top-center' });
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

      toast.success(`🎉 Welcome ${username}! Check your Gmail for a welcome message.`, {
        position: 'top-center',
        autoClose: 2000
      });

      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      if (
        error.response?.data?.includes("Duplicate") ||
        error.response?.status === 500
      ) {
        toast.error("This email is already registered. Please log in.", { position: 'top-center' });
      } else {
        toast.error("Registration failed. Please try again later.", { position: 'top-center' });
      }
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-page">
      <ToastContainer />
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
