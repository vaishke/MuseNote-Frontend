import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaFilter, FaHeart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardContent.css';
import axios from 'axios';

const DashboardContent = ({ posts }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef();
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

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
    setActiveFilter(type);
    setShowFilter(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      let endpoint = '';

      if (activeFilter === 'User') {
        endpoint = `/getPostsByUser/${searchTerm}`;
      } else if (activeFilter === 'Genre') {
        endpoint = `/getPostsByGenre/${searchTerm}`;
      } else if (activeFilter === 'Tag') {
        endpoint = `/getPostsByTags/${searchTerm}`;
      } else {
        endpoint = `/getPostsByTitle/${searchTerm}`;
      }

      const res = await axios.get(`http://localhost:8085${endpoint}`);
      setFilteredPosts(res.data);
    } catch (err) {
      console.error('Search failed:', err);
      alert('No results found or error fetching data.');
      setFilteredPosts([]);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar-dash">
        <div className="filter-wrapper" ref={filterRef}>
          <FaFilter className="filter-icon" onClick={toggleFilter} />
          {showFilter && (
            <div className="filter-dropdown-simple">
              <div onClick={() => handleFilterClick('User')} className="filter-item">User</div>
              <div onClick={() => handleFilterClick('Genre')} className="filter-item">Genre</div>
              <div onClick={() => handleFilterClick('Tag')} className="filter-item">Tag</div>
            </div>
          )}
        </div>

        <div className="search-container">
          {activeFilter && (
            <span className="search-chip">
              {activeFilter}
              <button
                className="remove-chip"
                onClick={() => setActiveFilter(null)}
              >
                ×
              </button>
            </span>
          )}
          <input
            type="text"
            className="search-bar-with-chip"
            placeholder="Search lyrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <FaSearch
            className="search-icon"
            onClick={handleSearch}
            title="Search"
            style={{ cursor: 'pointer', marginLeft: '8px' }}
          />
        </div>

        <Link to="/create">
          <button className="add-button" title="Add New Lyrics">
            <FaPlus size={18} />
          </button>
        </Link>
      </div>

      <div className="posts-section">
        {(filteredPosts.length > 0 ? filteredPosts : posts).length > 0 ? (
          (filteredPosts.length > 0 ? filteredPosts : posts).map((post) => (
            <PostCard key={post.postId} post={post} />
          ))
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

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to like/unlike posts.");
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
        const message = res.data;
        if (message === "Post liked") {
          setLikes((prev) => prev + 1);
          setLiked(true);
        } else if (message === "Post disliked") {
          setLikes((prev) => Math.max(prev - 1, 0));
          setLiked(false);
        }
      }
    } catch (err) {
      console.error("Like/unlike error:", err);
      if (err.response?.status === 403) {
        alert("Unauthorized: Please login again.");
      } else {
        alert("Error toggling like.");
      }
    }
  };

  return (
    <div className="post-card">
      <Link to={`/profile/${post.userreg?.userName}`} className="username-link">
        @{post.userreg?.userName}
      </Link>

      <Link to={`/postview/${post.postId}`} className="post-link">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </Link>

      <div className="like-section">
        <button className="like-button" onClick={handleLike}>
          <FaHeart style={{ color: liked ? 'red' : 'white' }} />
        </button>
        <span className="like-count">{likes} Likes</span>
      </div>
    </div>
  );
};

export default DashboardContent;
