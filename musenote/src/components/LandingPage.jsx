import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FaUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import './LandingPage.css';

const LandingPage = () => {
  const UserIcon = () => <FaUser className="user-icon" />;
  const RegIcon = () => <FaUserPlus className="sign-up" />;

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
         <Link to="/register" className="signin-link">
          <RegIcon />
          <span>Sign Up</span>
        </Link>
      </header>
    </div>
  );
};

export default LandingPage;