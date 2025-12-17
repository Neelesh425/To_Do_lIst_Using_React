// Layout/index.jsx - Updated with mobile backdrop
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import './index.scss';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Mobile backdrop */}
      <div 
        className={`layout__backdrop ${sidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />
      
      <div className="layout__content">
        <div className="layout__page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;