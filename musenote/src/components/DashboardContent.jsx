import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaFilter, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardContent.css';
import axios from 'axios';

const DashboardContent = ({ posts }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef();

  const toggleFilter = () => setShowFilter((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterClick = (type) => {
    alert(`Filter by ${type}`);
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar-dash">
        <div className="filter-wrapper" ref={filterRef}>
          <FaFilter className="filter-icon" onClick={toggleFilter} />
          {showFilter && (
            <div className="filter-dropdown-simple">
              <div onClick={() => handleFilterClick('Genre')} className="filter-item">Genre</div>
              <div onClick={() => handleFilterClick('Tag')} className="filter-item">Tag</div>
            </div>
          )}
        </div>

        <input type="text" placeholder="Search lyrics..." className="search-bar" />

        <Link to="/create">
          <button className="add-button" title="Add New Lyrics">
            <FaPlus size={18} />
          </button>
        </Link>
      </div>

      <div className="posts-section">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.postId} post={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    if (liked) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to like posts.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8085/likePost/${post.postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setLikes((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        alert("You already liked this post!");
        setLiked(true);
      } else if (err.response?.status === 403) {
        alert("Unauthorized: Please login again.");
      } else {
        alert("Error liking post.");
      }
    }
  };

  return (
    <div className="post-card">
      <Link to={`/profile/${post.userreg?.name}`} className="username-link">
        @{post.userreg?.name}
      </Link>

      <Link to={`/postview/${post.postId}`} className="post-link">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </Link>

      <div className="like-section">
        <button
          className="like-button"
          onClick={handleLike}
          disabled={liked}
        >
          <FaHeart style={{ color: liked ? 'red' : 'white' }} />
        </button>
        <span className="like-count">{likes} Likes</span>
      </div>
    </div>
  );
};

export default DashboardContent;
