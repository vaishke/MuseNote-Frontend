import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaTag, FaPlay, FaPause, FaCommentAlt } from 'react-icons/fa';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { RiHeadphoneLine } from 'react-icons/ri';
import './PostView.css';
import logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8085/getPostById/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch post'))
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load post", { position: "top-center" });
        setLoading(false);
      });

    fetch(`http://localhost:8085/isPostLiked/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to check like status'))
      .then(data => setLiked(data))
      .catch(() => {
        toast.error("Failed to check like status", { position: "top-center" });
      });

    fetch(`http://localhost:8085/comments/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setComments(data))
      .catch(() => toast.error("Could not fetch comments"));
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

      const message = await response.text();
      if (response.ok) {
        if (message === "Post liked") {
          setPost(prev => ({ ...prev, likes: prev.likes + 1 }));
          setLiked(true);
          toast.success("Post liked!", { position: "top-center" });
        } else if (message === "Post unliked") {
          setPost(prev => ({ ...prev, likes: Math.max(prev.likes - 1, 0) }));
          setLiked(false);
          toast.info("Post unliked", { position: "top-center" });
        }
      } else {
        toast.error(message || "Error toggling like", { position: "top-center" });
      }
    } catch {
      toast.error("Unable to like the post", { position: "top-center" });
    }
  };

  const handleAudioToggle = () => {
    const audio = document.querySelector('.audio-element');
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const token = localStorage.getItem('token');

      fetch(`http://localhost:8085/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: comment })
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(newComment => {
          setComments(prev => [...prev, newComment]);
          setComment('');
          toast.success("Comment submitted!");
        })
        .catch(() => toast.error("Failed to post comment"));
    }
  };

  if (loading) {
    return (
      <div className="magazine-container">
        <ToastContainer />
        <div className="loading-state">
          <div className="loading-animation">
            <BsMusicNoteBeamed className="loading-icon" />
            <p>Loading your creation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="magazine-container">
        <ToastContainer />
        <div className="error-state">
          <h2>Song not found</h2>
          <p>This creation might have been removed or doesn't exist.</p>
          <Link to="/home" className="back-home-link">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="magazine-container">
      <ToastContainer />

      <header className="magazine-header">
        <div className="header-content">
          <Link to="/home" className="logo-brand">
            <img src={logo} alt="Logo" className="brand-logo" />
          </Link>

          <div className="header-divider"></div>

          <nav className="magazine-nav">
            <Link to="/home" className="nav-item">
              <FaArrowLeft className="nav-icon" />
              <span>Back</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="magazine-main">
        <article className="song-article">
          <div className="article-header">
            <h1 className="article-title">{post.title}</h1>

            <div className="article-meta">
              <div className="artist-info">
                <div className="artist-avatar">
                  <FaUser className="avatar-icon" />
                </div>
                <div className="artist-details">
                  <span className="artist-label">Created by</span>
                  {post.userreg?.userName ? (
                    <Link to={`/profile/${post.userreg.userName}`} className="artist-name">
                      {post.userreg.userName}
                    </Link>
                  ) : (
                    <span className="artist-name unknown">Anonymous Artist</span>
                  )}
                </div>
              </div>

              <div className="engagement-stats vertical-stack">
                <button
                  className={`like-button ${liked ? 'liked' : ''}`}
                  onClick={handleLike}
                  title={liked ? "Unlike this creation" : "Like this creation"}
                >
                  {liked ? <HiHeart className="heart-icon filled" /> : <HiOutlineHeart className="heart-icon" />}
                  <span className="like-count">{post.likes}</span>
                </button>

                <button
                  className="like-button comment-button"
                  onClick={() => setShowCommentBox(!showCommentBox)}
                  title="Comment on this post"
                >
                  <FaCommentAlt className="heart-icon" />
                </button>
              </div>
            </div>

            <div className="tags-container">
              {post.tag1 && <span className="tag primary"><FaTag className="tag-icon" />{post.tag1}</span>}
              {post.tag2 && <span className="tag secondary"><FaTag className="tag-icon" />{post.tag2}</span>}
              {post.genre && <span className="tag genre-tag"><BsMusicNoteBeamed className="tag-icon" />{post.genre}</span>}
            </div>
          </div>

          {post.audioFileName && (
            <div className="audio-showcase">
              <div className="audio-header">
                <RiHeadphoneLine className="audio-icon" />
                <span className="audio-label">Listen to this creation</span>
              </div>

              <div className="audio-player-container">
                <button 
                  className="play-button"
                  onClick={handleAudioToggle}
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <audio 
                  className="audio-element"
                  controls
                  controlsList="nodownload"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={`http://localhost:8085/audio/${post.audioFileName}`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}

          <div className="article-body">
            <div className="content-header reduced-header">
              <h2 className="content-title">Lyrics</h2>
              <div className="content-divider"></div>
            </div>

            <div className="lyrics-container">
              <div className="lyrics-content">
                {post.content.split('\n').map((line, index) => (
                  <div key={index} className="lyric-line">
                    <p className="line-text">{line || '\u00A0'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      {showCommentBox && (
        <div className="comment-slide-up">
          <div className="comment-list">
            {comments.map((c, idx) => (
              <div key={idx} className="comment-bubble">
                <strong>{c.username}:</strong> {c.content}
              </div>
            ))}
          </div>
          <textarea
            className="comment-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleCommentSubmit} className="submit-comment-btn">Post</button>
        </div>
      )}
    </div>
  );
};

export default PostView;
