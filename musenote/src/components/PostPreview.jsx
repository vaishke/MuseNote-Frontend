import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PostPreview.css';

const PostPreview = ({ postid, title, content, likes, userid }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/postview`);
  };

  return (
    <div className="post-preview clickable" onClick={handleClick}>
      <h3>{title}</h3>
      <p>{content.slice(0, 60)}...</p>
      <div className="post-footer">
        <span
          className="post-userid"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${userid}`);
          }}
        >
        </span>
        <span className="likes">
          <FaHeart className="heart-icon" /> {likes} likes
        </span>
      </div>

    </div>
  );
};

export default PostPreview;
