import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PostPreview from './PostPreview';
import { Link } from 'react-router-dom';
import './DashboardContent.css';

const DashboardContent = ({ posts }) => {
  return (
    <div className="dashboard-container">
      <div className="top-bar-dash">
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