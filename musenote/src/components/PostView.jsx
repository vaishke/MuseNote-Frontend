import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { IoIosContact } from "react-icons/io";
import './PostView.css';
import logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        return res.json();
      })
      .then(data => {
        setPost(data);
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        toast.error("Failed to load post", { position: "top-center" });
      });

    // Check if liked
    fetch(`http://localhost:8085/isPostLiked/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to check like status');
        }
        return res.json();
      })
      .then(data => {
        setLiked(data);
      })
      .catch(err => {
        console.error('Error checking like status:', err);
        toast.error("Failed to check like status", { position: "top-center" });
      });
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
          toast.success("Post liked!", { position: "top-center" });
        } else if (message === "Post unliked") {
          setPost(prev => ({ ...prev, likes: Math.max(prev.likes - 1, 0) }));
          setLiked(false);
          toast.info("Post unliked", { position: "top-center" });
        } else {
          console.warn("Unexpected like response:", message);
          toast.warn("Unexpected like action", { position: "top-center" });
        }
      } else {
        const errMsg = await response.text();
        toast.error(errMsg || "Error toggling like", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      toast.error("Unable to like the post", { position: "top-center" });
    }
  };

  if (!post) {
    return (
      <div>
        <ToastContainer />
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />

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
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-view">
        <div className="first-black">
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span className="username">
              <IoIosContact /> Posted by: 
              {post.userreg?.userName ? (
                <Link to={`/profile/${post.userreg.userName}`} className="username-link">
                  @{post.userreg.userName}
                </Link>
              ) : (
                <span> Unknown</span>
              )}
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
            <div className="audio-player">
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
