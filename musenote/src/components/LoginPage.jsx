import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  
  const handleLogin = async () => {
      try {
        const loginUser = {
          userName: username,
          password: password
      };

      const response = await axios.post('http://localhost:8085/UsersLogin', loginUser);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.userName); 
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
      console.log('Login Successful: ', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Login Failed.', error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="logo-section">
         <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="login-form-container">
        <div className="login-box">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

