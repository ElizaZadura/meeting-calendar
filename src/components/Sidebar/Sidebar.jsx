import React from 'react';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li><button className="active">Dashboard</button></li>
        <li><button>Meetings</button></li>
        <li><button>Users</button></li>
        <li><button>Calendar</button></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar; 