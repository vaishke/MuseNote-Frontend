import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PostPreview from './PostPreview';
import './DashboardContent.css';

const DashboardContent = () => {
  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search lyrics..."
          className="search-bar"
        />
        <button className="add-button" title="Add New Lyrics">
          <FaPlus size={18} />
        </button>
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
