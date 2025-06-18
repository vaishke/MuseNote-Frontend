import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import DashboardContent from './DashboardContent';
import { FaUserCircle } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="top-bar-home">
        <div className="logo-container-home">
          <img src={logo} alt="Logo" className="logo-img-home" />
        </div>
        <div className="profile-container">
          <Link to="/profile" className="profile-link">
            <FaUserCircle size={28} color="#fff" />
            <span className="profile-label">Profile</span>
          </Link>
        </div>
      </header>
      <div className="content">
        <DashboardContent />
      </div>
    </div>
  );
};

export default HomePage;
