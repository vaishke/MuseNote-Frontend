import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';
import PostPreview from './PostPreview';
import { Link } from 'react-router-dom';
import './DashboardContent.css';

const DashboardContent = ({ posts }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef();

  const toggleFilter = () => setShowFilter((prev) => !prev);

  // Hide dropdown if clicked outside
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
    alert(`Filter by ${type}`); // Replace with logic to filter by tag/genre
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar-dash">
        <div className="filter-wrapper" ref={filterRef}>
          <FaFilter className="filter-icon" onClick={toggleFilter} />
          {showFilter && (
            <div className="filter-dropdown-simple">
              <div onClick={() => handleFilterClick('Genre')} className="filter-item">
                Genre
              </div>
              <div onClick={() => handleFilterClick('Tag')} className="filter-item">
                Tag
              </div>
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Search lyrics..."
          className="search-bar"
        />

        <Link to="/create">
          <button className="add-button" title="Add New Lyrics">
            <FaPlus size={18} />
          </button>
        </Link>
      </div>

      <div className="posts-section">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link to={`/postview/${post.postId}`} key={post.postId}>
              <PostPreview
                title={post.title}
                content={post.content}
                likes={post.likes || 0}
              />
            </Link>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
