import React from 'react';
import './ProfilePage.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PostPreview from './PostPreview';
import logo from '../assets/logo.png';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <img src={logo} alt="Logo" className="profile-logo" />
        <Link to="/home" className="back-btn">← Back to Home</Link>
      </header>

      <section className="profile-top">
        <div className="avatar-section">
          <FaUserCircle size={120} className="avatar-icon" />
        </div>

        <div className="center-section">
          <h2 className="profile-username">Kundana Varma</h2>
          <p className="bio">Just a melody in the making 🎵</p>
        </div>

        <div className="right-section">
          <div className="stats"><strong>150</strong><span>Followers</span></div>
          <div className="stats"><strong>180</strong><span>Following</span></div>
        </div>
      </section>

      {/* Posts Group Container */}
      <div className="posts-box">
        <h3 className="section-title">My Posts</h3>
        <div className="posts-column">
          <PostPreview title="Title 1" content="Aasa paasam bandee sesene..." likes={12} />
          <PostPreview title="Title 2" content="Lyricssssssssssssssssssssssss..." likes={45} />
          <PostPreview title="Title 3" content="Lyricssssssssssssssssssssssss..." likes={45} />
          <PostPreview title="Title 4" content="Lyricssssssssssssssssssssssss..." likes={45} />
        </div>
      </div>

      <button className="logout-btn">Log Out</button>
    </div>
  );
};

export default ProfilePage;
