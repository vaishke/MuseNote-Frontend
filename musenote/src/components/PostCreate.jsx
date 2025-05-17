import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Logo from './Logo';
import './PostCreate.css';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with actual post logic
    console.log({ title, content });
    alert('Post submitted!');
  };

  return (
    <div>
      {/* Header */}
      <div className="top-bar">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="back-home">
          <Link to="/" className="home-link">
            <FaArrowLeft className="home-icon" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Create Post Form */}
      <div className="post-create">
        <h1 className="form-title">Create a New Post</h1>
        <div className="divider"></div>

        <form onSubmit={handleSubmit}>
          <label className="input-label">Title</label>
          <input
            type="text"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="input-label">Content</label>
          <textarea
            className="textarea-field"
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="submit-button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostCreate;
