import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { IoIosContact } from "react-icons/io";
import './PostView.css';
import logo from '../assets/logo.png';

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false); // Track if user liked this post

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch post details
    fetch(`http://localhost:8085/getPostById/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  // Handle Like button click
  const handleLike = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8085/likePost/${postId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPost(prev => ({ ...prev, likes: prev.likes + 1 }));
        setLiked(true);
      } else {
        const errMsg = await response.text();
        alert(errMsg || "Failed to like post.");
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  if (!post) {
    return <div className="loading">Loading post...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="top-bar-postview">
        <div className="logo-container">
           <Link to="/home" className='logo-img-post'>
          <img src={logo} alt="Logo" className="logo-img-home" />
          </Link>
        </div>
        <div className="back-home">
          <Link to="/home" className="home-link">
            <FaArrowLeft className="home-icon" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-view">
        <div className="first-black">
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span className="username">
              <IoIosContact /> Posted by: @{post.userreg && post.userreg.userName ? post.userreg.userName : 'Unknown'}
            </span>

            <button
              className="likes-button"
              onClick={handleLike}
              disabled={liked}
              title={liked ? "Already liked" : "Click to like"}
            >
              <FaHeart className="heart-icon" />
              {post.likes} {post.likes === 1 ? 'like' : 'likes'}
            </button>
          </div>
          <span className="genre">{post.genre}</span>
          <div className="post-tags">
           
            <span>{post.tag1}</span>
            <span style={{ marginLeft: '12px' }}>{post.tag2}</span>
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
