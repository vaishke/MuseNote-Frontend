import React from 'react';
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
          <FaUserCircle size={28} color="#fff" />
          <span className="profile-label">Profile</span>
        </div>
      </div>
      <div className="content">
        <DashboardContent />
      </div>
    </div>
  );
};

export default HomePage;
