import React, { useState } from 'react';
import axios from 'axios';
import Logo from './Logo';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const handleRegister = async () => {
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
    } catch (error) {
      console.error('Registration Failed.', error);
    }
  };

  return (
    <div className="register-page">
      <div className="logo-section">
        <Logo />
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
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="register-input"
          />
          <button onClick={handleRegister} className="register-button">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
