import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PostPreview from './PostPreview';
import { Link } from 'react-router-dom';
import './DashboardContent.css';

const DashboardContent = () => {
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
        <PostPreview 
          title="Title 1"
          content="Lyricssssssssssssssssssssssss..."
          likes={12}
        />
        <PostPreview 
          title="Title 2"
          content="Lyricssssssssssssssssssssssss..."
          likes={45}
        />
        <PostPreview 
          title="Title 2"
          content="Lyricssssssssssssssssssssssss..."
          likes={45}
        />
        <PostPreview 
          title="Title 2"
          content="Lyricssssssssssssssssssssssss..."
          likes={45}
        />
        <PostPreview 
          title="Title 2"
          content="Lyricssssssssssssssssssssssss..."
          likes={45}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
