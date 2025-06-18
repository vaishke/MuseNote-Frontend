import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import PostPreview from './PostPreview';
import logo from '../assets/logo.png';
import './ProfilePage.css';
import axios from 'axios';

const ProfilePage = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user posts
        const postsRes = await axios.get(`http://localhost:8085/getPostsByUser/${username}`);
        setPosts(postsRes.data);

        // Get follower & following count
        const followRes = await axios.get(`http://localhost:8085/followCount/${username}`);
        setFollowers(followRes.data.followers);
        setFollowing(followRes.data.following);
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="profile-page">
      <header className="profile-header">
        <img src={logo} alt="Logo" className="profile-logo" />
        <Link to="/home" className="back-btn">← Back to Home</Link>
      </header>

      <section className="profile-top">
        <div className="avatar-section">
          <FaUserCircle size={120} className="avatar-icon" />
        </div>

        <div className="center-section">
          <h2 className="profile-username">{username}</h2>
          <p className="bio">Just a melody in the making 🎵</p>
        </div>

        <div className="right-section">
          <div className="stats"><strong>{followers}</strong><span>Followers</span></div>
          <div className="stats"><strong>{following}</strong><span>Following</span></div>
        </div>
      </section>

      <div className="posts-box">
        <div className="posts-header">
          <h3 className="section-title">My Posts</h3>
          <Link to="/create">
            <button className="add-lyrics-btn" title="Add New Lyrics">Create Post</button>
          </Link>
        </div>
        <div className="posts-column">
          {posts.length === 0 ? (
            <p className="no-posts-message">No posts yet.</p>
          ) : (
            posts.map((post, index) => (
              <PostPreview
                key={index}
                title={post.title}
                content={post.content}
                likes={post.likes || 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
