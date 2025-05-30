import React from 'react';
import './Topbar.css';

const Topbar = () => (
  <header className="topbar">
    <div className="logo">📅</div>
    <nav className="topbar-nav">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </nav>
    <div className="user-info">Demo</div>
  </header>
);

export default Topbar; 