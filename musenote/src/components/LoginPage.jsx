import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
      <h1>Login Page</h1>
      <p>This is where the login form will eventually go.</p>
      <Link to="/" style={{ color: '#61dafb' }}>Go back to Home</Link>
    </div>
  );
};

export default LoginPage;