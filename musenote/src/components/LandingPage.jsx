import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FaRegUser } from "react-icons/fa";
import './LandingPage.css';

const LandingPage = () => {
  const UserIcon = () => <FaRegUser className="user-icon" />;

  return (
    <div className="landing-page-container">
      <header className="landing-header">
        <div className="logo-container-landing">
          <Logo />
        </div>
        <Link to="/login" className="signin-link">
          <UserIcon />
          <span>Sign In</span>
        </Link>
      </header>
    </div>
  );
};

export default LandingPage;