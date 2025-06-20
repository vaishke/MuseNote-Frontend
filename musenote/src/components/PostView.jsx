import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { IoIosContact } from "react-icons/io";
import './PostView.css';
import logo from '../assets/logo.png';

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch post
    fetch(`http://localhost:8085/getPostById/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setPost(data);
      })
      .catch(err => console.error('Error fetching post:', err));

    // Check if liked
    fetch(`http://localhost:8085/isPostLiked/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setLiked(data);
      })
      .catch(err => console.error('Error checking like status:', err));
  }, [postId]);

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
      const message = await response.text();

      if (message === "Post liked") {
        setPost(prev => ({ ...prev, likes: prev.likes + 1 }));
        setLiked(true);
      } else if (message === "Post unliked") {
        setPost(prev => ({ ...prev, likes: Math.max(prev.likes - 1, 0) }));
        setLiked(false);
      } else {
        console.warn("Unexpected like response:", message);
      }

    } 
      else {
      const errMsg = await response.text();
      alert(errMsg || "Error toggling like");
    }
  } catch (err) {
    console.error("Error toggling like:", err);
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
              title={liked ? "Click to unlike" : "Click to like"}
            >
              <FaHeart className="heart-icon" style={{ color: liked ? 'red' : 'gray' }} />
              {post.likes} {post.likes === 1 ? 'like' : 'likes'}
            </button>
          </div>
          <span className="genre">{post.genre}</span>
          <div className="post-tags">
            <span>{post.tag1}</span>
            <span style={{ marginLeft: '12px' }}>{post.tag2}</span>
          </div>
          {post.audioFileName && (
            <div className="audio-player" style={{ marginTop: '20px' }}>
              <h4>Audio Preview</h4>
              <audio controls controlsList="nodownload" style={{ width: '100%' }}>
                <source src={`http://localhost:8085/audio/${post.audioFileName}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
          

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
