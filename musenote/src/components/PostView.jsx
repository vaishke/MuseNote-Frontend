import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import Logo from './Logo';
import './PostView.css';

const PostView = () => {
  const { postId } = useParams();

  // Mock data - replace with real fetch later
  const post = {
    title: 'Sample Post Title',
    content: `This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.This is a sample lyric line one.\nLine two continues here...\nAnother poetic line.`,
    username: 'lyric_master',
    likes: 42,
    genre: 'Pop',
    tag1: '#love',
    tag2: '#dreams',
  };

  return (
    <div>
      {/* Header Section */}
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

      {/* Post Content Section */}
      <div className="post-view">
        <h1 className="post-title">{post.title}</h1>
        <div className="divider"></div> {/* Line below title */}

        <div className="post-meta">
          <span className="username">Posted by: @{post.username}</span>
          <span className="likes">
            <FaHeart className="heart-icon" /> {post.likes} likes
          </span>
        </div>
        <div className="post-tags">
          <span>{post.genre}</span> <span>{post.tag1}</span> <span>{post.tag2}</span>
        </div>
        <div className="divider"></div> {/* Line below post-meta */}

        {/* <div className="post-tags">
          <span>{post.genre}</span> <span>{post.tag1}</span> <span>{post.tag2}</span>
        </div> */}
        <div className="post-body">
          {post.content.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
  </div>
</div>

    </div>
  );
};

export default PostView;
