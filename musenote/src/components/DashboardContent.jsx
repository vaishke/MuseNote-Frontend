import React, { useState } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';
import PostPreview from './PostPreview';
import { Link } from 'react-router-dom';
import './DashboardContent.css';

const DashboardContent = ({ posts }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef();
  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <div className="dashboard-container">
      <div className="top-bar-dash">
        <div className="filter-container">
          <FaFilter
            className="filter-icon"
            title="Filter"
            onClick={toggleFilter}
          />
          {showFilter && (
            <div className="filter-dropdown">
              <label>
                Genre:
                <select
                  value={selectedFilter.genre}
                  onChange={(e) =>
                    setSelectedFilter({ ...selectedFilter, genre: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Rap">Rap</option>
                </select>
              </label>
              <label>
                Tag:
                <select
                  value={selectedFilter.tag}
                  onChange={(e) =>
                    setSelectedFilter({ ...selectedFilter, tag: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="Love">Love</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Breakup">Breakup</option>
                </select>
              </label>
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