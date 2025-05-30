import React from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Topbar from '../Topbar/Topbar.jsx';
import './AppLayout.css';

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Topbar />
    <div className="app-body">
      <Sidebar />
      <main className="app-content">{children}</main>
    </div>
  </div>
);

export default AppLayout; 