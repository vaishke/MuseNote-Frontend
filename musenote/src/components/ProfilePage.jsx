import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import { MdModeEdit, MdSave, MdDelete } from "react-icons/md";
import PostPreview from './PostPreview';
import logo from '../assets/logo.png';
import './ProfilePage.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [bio, setBio] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const current = decoded.sub || decoded.userName || decoded.username;
    setCurrentUser(current);

    const fetchUserData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const postsRes = await axios.get(`http://localhost:8085/getPostsByUser/${username}`, { headers });
        setPosts(postsRes.data);

        const profileRes = await axios.get(`http://localhost:8085/getUserByName/${username}`, { headers });
        setBio(profileRes.data.bio || '');

        const followRes = await axios.get(`http://localhost:8085/followCount/${username}`, { headers });
        setFollowers(followRes.data.followers);
        setFollowing(followRes.data.following);

        if (current && current !== username) {
          const followStatusRes = await axios.get(`http://localhost:8085/isFollowing/${current}/${username}`, { headers });
          setIsFollowing(followStatusRes.data.following);
        }

        const followersListRes = await axios.get(`http://localhost:8085/getFollowers/${username}`, { headers });
        setFollowersList(followersListRes.data);

        const followingListRes = await axios.get(`http://localhost:8085/getFollowing/${username}`, { headers });
        setFollowingList(followingListRes.data);

      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        headers: { Authorization: `Bearer ${token}` }
      });
      setBio(newBio);
      setEditingBio(false);
    } catch (err) {
      console.error("Error updating bio:", err);
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8085/deletePost/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post.postId !== postId));
      toast.success("Post deleted.", { position: "top-center" });
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post.", { position: "top-center" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8085/deleteUser/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Account deleted.", { position: "top-center" });
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.error("Error deleting account:", err);
      toast.error("Failed to delete account.", { position: "top-center" });
    }
  };

  return (
    <div className="profile-page">
      <ToastContainer />

      <header className="profile-header">
        <Link to="/home" className="profile-logo">
          <img src={logo} alt="Logo" className="profile-logo" />
        </Link>
        <div className="header-right">
          <Link to="/home" className="back-btn">
            <FaArrowLeft style={{ marginRight: '8px' }} /> Back
          </Link>
          {currentUser === username && (
            <div className="profile-menu" ref={menuRef}>
              <button className="three-dot-btn" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>⋮</button>
              {showProfileDropdown && (
                <div className="profile-dropdown-menu">
                  <button className="dropdown-item" onClick={handleDeleteAccount}>Delete Account</button>
                  <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <section className="profile-top">
        <div className="avatar-section">
          <FaUserCircle size={120} className="avatar-icon" />
        </div>

        <div className="center-section">
          <div className="bio-div">
            <h2 className="profile-username">{username}</h2>
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
                <p className="bio">{bio || 'No bio yet'}</p>
                {currentUser === username && (
                  <button onClick={handleEdit}><MdModeEdit /></button>
                )}
              </>
            )}
          </div>

          {currentUser && currentUser !== username && (
            <button
              className={`follow-btn ${isFollowing ? 'unfollow' : 'follow'}`}
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  const endpoint = isFollowing ? "/unfollow" : "/follow";
                  await axios.post(`http://localhost:8085${endpoint}`, {
                    follower: currentUser,
                    followee: username
                  }, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
                  setIsFollowing(!isFollowing);
                  setFollowers(prev => isFollowing ? prev - 1 : prev + 1);
                } catch (err) {
                  console.error("Follow/unfollow failed:", err);
                }
              }}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <div className="right-section">
          <div className="stats" onClick={() => setShowFollowers(!showFollowers)}>
            <strong>{followers}</strong><span>Followers</span>
          </div>
          <div className="stats" onClick={() => setShowFollowing(!showFollowing)}>
            <strong>{following}</strong><span>Following</span>
          </div>
        </div>
      </section>

      {(showFollowers || showFollowing) && (
        <div className="follow-lists-container">
          {showFollowers && (
            <div className="follow-list">
              <h4>Followers</h4>
              <ul>
                {followersList.length === 0 ? (
                  <li>No followers yet.</li>
                ) : (
                  followersList.map((f, i) => (
                    <li key={i}><Link to={`/profile/${f}`}>{f}</Link></li>
                  ))
                )}
              </ul>
            </div>
          )}
          {showFollowing && (
            <div className="follow-list">
              <h4>Following</h4>
              <ul>
                {followingList.length === 0 ? (
                  <li>Not following anyone yet.</li>
                ) : (
                  followingList.map((f, i) => (
                    <li key={i}><Link to={`/profile/${f}`}>{f}</Link></li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="posts-box">
        <div className="posts-header">
          <h3 className="section-title">{username} Posts</h3>
          {currentUser === username && (
            <Link to="/create">
              <button className="add-lyrics-btn" title="Add New Lyrics">Create Post</button>
            </Link>
          )}
        </div>
        <div className="posts-column">
          {posts.length === 0 ? (
            <p className="no-posts-message">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div className="post-container" key={post.postId}>
                <Link to={`/postview/${post.postId}`} className="post-link">
                  <PostPreview
                    title={post.title}
                    content={post.content}
                    likes={post.likes || 0}
                  />
                </Link>
                {currentUser === username && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post.postId)}
                    title="Delete this post"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
