import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  
  const handleLogin = () => {
    navigate('/home');
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
