import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { IoIosContact } from "react-icons/io";
import './PostView.css';
import logo from '../assets/logo.png';

const PostView = () => {
  const params = useParams();
  const { postId } = params;
  console.log("Params:", params);
  
  
  const [post, setPost] = useState(null);
  

 useEffect(() => {
  const token = localStorage.getItem('token'); // Assuming you store JWT in localStorage
  console.log("Fetching post with ID:", postId);

  fetch(`http://localhost:8085/getPostById/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched post data:", data);
      setPost(data);
    })
    .catch(error => {
      console.error('Error fetching post:', error);
    });
}, [postId]);


  if (!post) {
    return <div className="loading">Loading post...</div>;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="top-bar-postview">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img-home" />
        </div>
        <div className="back-home">
          <Link to="/home" className="home-link">
            <FaArrowLeft className="home-icon" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
      
      {/* Post Content Section */}
      <div className="post-view">
        <div className="first-black">
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span className="username">
            
              <IoIosContact /> Posted by: @{post.userreg?.userName || 'Unknown'}
            </span>
            <span className="likes">
              <FaHeart className="heart-icon" /> {post.likes || 0} likes
            </span>
          </div>

          <div className="post-tags">
            <span>{post.genre}</span> <span>{post.tag1}</span> <span>{post.tag2}</span>
          </div>
        </div>

        <div className="post-body">
          <div className="lyric">
            {post.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
