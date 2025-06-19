import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import DashboardContent from './DashboardContent';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8085/getAllPosts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        if (error.response?.status === 403) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        }
      }
    };

    fetchPosts();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="home-page" onClick={closeDropdown}>
      <header className="top-bar-home" onClick={(e) => e.stopPropagation()}>
        <div className="logo-container-home">
          <img src={logo} alt="Logo" className="logo-img-home" />
        </div>

        <div className="profile-dropdown">
          <FaUserCircle
            size={28}
            color="#fff"
            className="profile-icon"
            onClick={toggleDropdown}
          />

          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>Profile</Link>
              <button className="dropdown-item logout">Log Out</button> {/* Non-functional */}
            </div>
          )}
        </div>
      </header>

      <div className="content">
        <DashboardContent posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;
