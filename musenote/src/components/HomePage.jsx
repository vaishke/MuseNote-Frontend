import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import DashboardContent from './DashboardContent';
import { FaUserCircle } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="profile-container">
          <Link to="/profile" className="profile-link">
            <FaUserCircle size={28} color="#fff" />
            <span className="profile-label">Profile</span>
          </Link>
        </div>
      </div>
      <div className="content">
        <DashboardContent />
      </div>
    </div>
  );
};

export default HomePage;
