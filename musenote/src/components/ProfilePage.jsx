import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { MdModeEdit, MdSave } from "react-icons/md";
import PostPreview from './PostPreview';
import logo from '../assets/logo.png';
import './ProfilePage.css';
import axios from 'axios';

const ProfilePage = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [bio, setBio] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Fetch Posts
        const postsRes = await axios.get(`http://localhost:8085/getPostsByUser/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(postsRes.data);

        // Fetch User Bio
        const profileRes = await axios.get(`http://localhost:8085/getUserByName/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBio(profileRes.data.bio || '');

        // Fetch Follower/Following Count
        const followRes = await axios.get(`http://localhost:8085/followCount/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFollowers(followRes.data.followers);
        setFollowing(followRes.data.following);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchUserData();
  }, [username]);

  const handleEdit = () => {
    setEditingBio(true);
    setNewBio(bio);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:8085/updateBio", {
        username,
        bio: newBio
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setBio(newBio);
      setEditingBio(false);
    } catch (err) {
      console.error("Error updating bio:", err);
    }
  };

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
          <div className="bio-div">
            {editingBio ? (
              <>
                <textarea
                  className="bio-edit-text"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                />
                <button onClick={handleSave}><MdSave /></button>
              </>
            ) : (
              <>
                <p className="bio">{bio}</p>
                <button onClick={handleEdit}><MdModeEdit /></button>
              </>
            )}
          </div>
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
