import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './PostPreview.css';

const PostPreview = ({ title, content, likes }) => {
  return (
    <div className="post-preview">
      <h3>{title}</h3>
      <p>{content}</p>
      <div className="likes">
        <FaHeart className="heart-icon" /> {likes} likes
      </div>
    </div>
  );
};

export default PostPreview;
