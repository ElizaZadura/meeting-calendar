import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
          </li>
          <li>
            <Link to="/meetings" className={location.pathname === '/meetings' ? 'active' : ''}>Meetings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 