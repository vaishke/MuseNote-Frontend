import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import PostView from './components/PostView';
import PostCreate from './components/PostCreate';
import PrivateRoute from './components/PrivateRoute';

import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        {/* protected routes */}
        <Route path="/home" element={
          <PrivateRoute><HomePage /></PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute><ProfilePage /></PrivateRoute>
        } />
        <Route path="/postview/:postId" element={
          <PrivateRoute><PostView /></PrivateRoute>
        } />
        
        <Route path="/create" element={
          <PrivateRoute><PostCreate /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

