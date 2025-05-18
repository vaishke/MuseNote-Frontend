import React, { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const loginUser = {
        userName: username,  
        password: password
      };
      console.log('Login attempt:', loginUser);
      const response = await axios.post('http://localhost:8085/UsersLogin', loginUser);
      console.log('Login Successful: ', response.data);
    } catch (error) {
      console.error('Login Failed.', error);
    }
  };

  return (
    <div className="login-page">
      <div className="logo-section">
        <Logo />
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
