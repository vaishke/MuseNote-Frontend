import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './PostCreate.css';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');
  const [genre, setGenre] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const postData = {
      title,
      content,
      tag1,
      tag2,
      genre
    };

    try {
      const response = await fetch("http://localhost:8085/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        alert("Post submitted successfully!");
        fileInputRef.current.value = "";
        window.location.href = "/home";
      } else {
        const err = await response.json();
        alert(`Error: ${err.message || "Failed to submit post"}`);
      }
    } catch (error) {
      console.error("Post creation failed:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="top-bar-post">
        <div className="logo-container-post">
          <img src={logo} alt="Logo" className="logo-img-post" />
        </div>
        <div className="back-home">
          <Link to="/home" className="home-link">
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
          <div className="form-group">
            <label className="input-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              Content <span className="required">*</span>
            </label>
            <textarea
              className="textarea-field"
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group tag-container">
            <div className="input-group">
              <label className="input-label">Tag-1</label>
              <input
                type="text"
                className="input-field"
                value={tag1}
                onChange={(e) => setTag1(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Tag-2</label>
              <input
                type="text"
                className="input-field"
                value={tag2}
                onChange={(e) => setTag2(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">
              Genre <span className="required">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">Upload Audio</label>
            <input
              type="file"
              accept=".mp3, .wav"
              className="input-field"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <button type="submit" className="submit-button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostCreate;
