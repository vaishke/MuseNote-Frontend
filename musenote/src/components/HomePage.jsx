import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import DashboardContent from './DashboardContent';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8085/getAllPosts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data); // adjust this if the backend returns something like { posts: [...] }
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
        <DashboardContent posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;