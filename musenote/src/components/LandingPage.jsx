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
        <img src={logo || "/placeholder.svg"} alt="Logo" className="logo-img" />
        <div className="nav-links">
          <a href="#about" className="signin-link">
            <AboutIcon />
            <span>About</span>
          </a>
        </div>
      </header>

      <div className="background-image">
        <img src={bg2 || "/placeholder.svg"} alt="Background" className="bgimg" />
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
              Don't have an account?
              <Link to="/register" className="login-link-span"> Create new account</Link>
            </p>
          </div>
        </div>
      </div>

      <section id="about" className="about-section">
        <div className="about-container">
          <h2>About MuseNote</h2>
          <p className="about-subtitle">Where lyrics come alive and music stories are shared</p>
          
          <div className="about-content">
            <div className="about-text">
              <h3>Your Creative Musical Journey</h3>
              <p>
                MuseNote is a <span className="highlight">creative space</span> where music lovers, lyricists and artists come together
                to share the soul of songs — the lyrics. Whether you're penning your own verses or
                sharing lines that moved you, MuseNote is your stage.
              </p>
              <p>
                Post your favorite lyrics, discover new ones, follow lyricists you love, and build a
                <span className="highlight"> personal collection</span> of lyrical moments that resonate with your soul.
              </p>
              <p>
                Let the words of music speak — <span className="highlight">one lyric at a time</span>.
              </p>
            </div>
            <div className="about-image-container">
              <img src={bg1 || "/placeholder.svg"} alt="About MuseNote" className="bgimg_about" />
            </div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🎵</span>
              <h4>Share Your Lyrics</h4>
              <p>Express yourself by sharing your original lyrics or your favorite song verses with the community.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h4>Discover New Music</h4>
              <p>Explore a vast collection of lyrics from various genres and discover your next favorite song.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">👥</span>
              <h4>Connect with Artists</h4>
              <p>Follow your favorite lyricists and artists, and build meaningful connections in the music community.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📚</span>
              <h4>Build Your Collection</h4>
              <p>Create your personal library of meaningful lyrics and organize them by mood, genre, or artist.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">✨</span>
              <h4>Get Inspired</h4>
              <p>Find inspiration from other creators and let the power of words fuel your own musical creativity.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🎤</span>
              <h4>Showcase Talent</h4>
              <p>Use MuseNote as your platform to showcase your lyrical talent and gain recognition from peers.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MuseNote. All rights reserved.</p>
        <a
          href="mailto:srinikhilamaravajjala@gmail.com?subject=MuseNote%20Inquiry&body=Hi%20MuseNote%20Team,%0D%0A%0D%0AI would like to..."
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          Contact Us
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
