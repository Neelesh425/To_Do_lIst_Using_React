import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './index.scss';

const Sidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <button 
        className="sidebar__toggle"
        onClick={onToggle}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar__header">
          <h2>Task Scheduler</h2>
        </div>

        <nav className="sidebar__nav">
          <NavLink 
            to="/todo" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => window.innerWidth <= 768 && onToggle?.()}
          >
            <span className="icon">📋</span>
            <span className="text">My Tasks</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => window.innerWidth <= 768 && onToggle?.()}
          >
            <span className="icon">👤</span>
            <span className="text">Profile</span>
          </NavLink>
        </nav>

        <div className="sidebar__footer">
          <button onClick={handleLogoutClick} className="logout-btn">
            <span className="icon">🚪</span>
            <span className="text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay" onClick={handleLogoutCancel}>
          <div className="logout-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-confirm-modal__icon">⚠️</div>
            <h3 className="logout-confirm-modal__title">Confirm Logout</h3>
            <p className="logout-confirm-modal__message">
              Are you sure you want to log out?
            </p>
            <div className="logout-confirm-modal__actions">
              <button 
                className="logout-confirm-modal__btn logout-confirm-modal__btn--cancel"
                onClick={handleLogoutCancel}
              >
                Cancel
              </button>
              <button 
                className="logout-confirm-modal__btn logout-confirm-modal__btn--confirm"
                onClick={handleLogoutConfirm}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;