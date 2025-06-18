import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import { FaUser, FaInfo, FaUserPlus } from "react-icons/fa";
import './LandingPage.css';

const LandingPage = () => {
  const UserIcon = () => <FaUser className="user-icon" />;
  const RegIcon = () => <FaUserPlus className="sign-up" />;
  const AboutIcon = () => <FaInfo className="about-icon" />;

  return (
    <div className="landing-page-container">
      <header className="landing-header">
        <img src={logo} alt="Logo" className="logo-img" />
        <div className="nav-links">
          <Link to="/login" className="signin-link">
            <UserIcon />
            <span>Sign In</span>
          </Link>
          <Link to="/register" className="signin-link">
            <RegIcon />
            <span>Sign Up</span>
          </Link>
          <a href="#about" className="signin-link">
            <AboutIcon />
            <span>About</span>
          </a>
        </div>
      </header>
      <div className="background-image">
        <img src={bg2} alt="Background" className="bgimg" />
      </div>
      <section id="about" className="about-section">
        <h2>About</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              MuseNote is a creative space where music lovers, lyricists and artists come together to share the soul of songs — the lyrics. Whether you're penning your own verses or sharing lines that moved you, MuseNote is your stage.

Post your favorite lyrics, discover new ones, follow lyricists you love, and build a personal collection of lyrical moments that resonate.

Let the words of music speak — one lyric at a time.
            </p>
          </div>
            <img src={bg1} alt="About Visual" className="bgimg_about" />
        </div>
      </section>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Linklet. All rights reserved.</p>
        <a href="abc@gmail.com" className="contact-link">Contact Us</a>
      </footer>
    </div>
  );
};

export default LandingPage;
