import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import { FaInfo } from "react-icons/fa";
import axios from 'axios';
import './LandingPage.css';

const LandingPage = () => {
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
        console.log('Login Successful: ', response.data);
        navigate('/home');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error('Login Failed.', error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const AboutIcon = () => <FaInfo className="about-icon" />;

  return (
    <div className="landing-page-container">
      <header className="landing-header">
        <img src={logo} alt="Logo" className="logo-img" />
        <div className="nav-links">
          <a href="#about" className="signin-link">
            <AboutIcon />
            <span>About</span>
          </a>
        </div>
      </header>

      <div className="background-image">
        <img src={bg2} alt="Background" className="bgimg" />
        <div className="login-box-wrapper">
          <div className="login-box">
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

            <p className="login-link-text">
              Don’t have an account?
              <Link to="/register" className="login-link-span"> Create new account</Link>
            </p>
          </div>
        </div>
      </div>

      <section id="about" className="about-section">
        <h2>About</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              MuseNote is a creative space where music lovers, lyricists and artists come together
              to share the soul of songs — the lyrics. Whether you're penning your own verses or
              sharing lines that moved you, MuseNote is your stage.
              <br /><br />
              Post your favorite lyrics, discover new ones, follow lyricists you love, and build a
              personal collection of lyrical moments that resonate.
              <br /><br />
              Let the words of music speak — one lyric at a time.
            </p>
          </div>
          <img src={bg1} alt="About Visual" className="bgimg_about" />
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Linklet. All rights reserved.</p>
        <a href="mailto:abc@gmail.com" className="contact-link">Contact Us</a>
      </footer>
    </div>
  );
};

export default LandingPage;
