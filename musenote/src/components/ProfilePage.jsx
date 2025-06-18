import React, { useState } from 'react';
import './ProfilePage.css';
import { FaUserCircle, FaEnvelope, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const ProfilePage = () => {
  const [username, setUsername] = useState('Rishitha Reddy');
  const [email, setEmail] = useState('rishitha@example.com');
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <img src={logo} alt="Logo" className="profile-logo" />
        <Link to="/home" className="back-home-link">← Back to Home</Link>
      </header>

      <div className="profile-card">
        <div className="avatar-section">
          <FaUserCircle size={100} color="#ccc" />
          <h2>{username}</h2>
        </div>

        <div className="profile-info">
          <label>Name</label>
          {editing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="profile-input"
            />
          ) : (
            <p>{username}</p>
          )}

          <label>Email</label>
          {editing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="profile-input"
            />
          ) : (
            <p>{email}</p>
          )}

          <div className="profile-actions">
            {editing ? (
              <button className="save-btn" onClick={handleSave}>Save</button>
            ) : (
              <button className="edit-btn" onClick={() => setEditing(true)}>
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
