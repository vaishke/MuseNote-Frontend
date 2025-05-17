import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PostPreview.css';

const PostPreview = ({ postid, title, content, likes }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postid}`);
  };

  return (
    <div className="post-preview clickable" onClick={handleClick}>
      <h3>{title}</h3>
      <p>{content.slice(0, 60)}...</p>
      <div className="likes">
        <FaHeart className="heart-icon" /> {likes} likes
      </div>
    </div>
  );
};

export default PostPreview;
