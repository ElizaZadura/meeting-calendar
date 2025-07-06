import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Topbar.css';

const Topbar = () => {
  const location = useLocation();
  return (
    <header className="topbar">
      <div className="logo">📅</div>
      <nav className="topbar-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/meetings" className={location.pathname === '/meetings' ? 'active' : ''}>Meetings</Link>
      </nav>
    </header>
  );
};

export default Topbar; 