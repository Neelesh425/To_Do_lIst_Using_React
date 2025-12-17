import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI, taskAPI } from '../../services/api';
import './index.scss';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    high: 0,
    medium: 0,
    low: 0
  });
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmEmail, setDeleteConfirmEmail] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await taskAPI.getTasks();
      const tasks = response.data;
      
      const completed = tasks.filter(t => t.status === 'completed').length;
      const pending = tasks.filter(t => t.status !== 'completed').length;
      const high = tasks.filter(t => t.priority === 'high').length;
      const medium = tasks.filter(t => t.priority === 'medium').length;
      const low = tasks.filter(t => t.priority === 'low').length;
      
      setStats({
        total: tasks.length,
        completed,
        pending,
        high,
        medium,
        low
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Name cannot be empty' });
      return;
    }

    setLoading(true);
    try {
      await authAPI.updateProfile({ name });
      setMessage({ type: 'success', text: 'Name updated successfully!' });
      setIsEditingName(false);
      window.location.reload();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update name' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);
    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmEmail !== user?.email) {
      setMessage({ type: 'error', text: 'Email does not match' });
      return;
    }

    setLoading(true);
    try {
      await authAPI.deleteAccount();
      logout();
      navigate('/');
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete account' });
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="profile">
      <div className="profile__container">
        {/* Header Section */}
        <div className="profile__header">
          <div className="profile__avatar">
            {getInitials(user?.name || 'User')}
          </div>
          <div className="profile__header-info">
            <h1>{user?.name}</h1>
            <p className="profile__email">{user?.email}</p>
            <p className="profile__joined">Joined {formatDate(user?.createdAt)}</p>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`profile__message profile__message--${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Stats Section */}
        <div className="profile__section">
          <h2 className="profile__section-title">Task Statistics</h2>
          <div className="profile__stats">
            <div className="stat-card stat-card--primary">
              <div className="stat-card__icon">📊</div>
              <div className="stat-card__info">
                <span className="stat-card__value">{stats.total}</span>
                <span className="stat-card__label">Total Tasks</span>
              </div>
            </div>
            
            <div className="stat-card stat-card--success">
              <div className="stat-card__icon">✅</div>
              <div className="stat-card__info">
                <span className="stat-card__value">{stats.completed}</span>
                <span className="stat-card__label">Completed</span>
              </div>
            </div>
            
            <div className="stat-card stat-card--warning">
              <div className="stat-card__icon">⏳</div>
              <div className="stat-card__info">
                <span className="stat-card__value">{stats.pending}</span>
                <span className="stat-card__label">Pending</span>
              </div>
            </div>
          </div>

          <div className="profile__priority-stats">
            <div className="priority-stat priority-stat--high">
              <span className="priority-stat__label">High Priority</span>
              <span className="priority-stat__value">{stats.high}</span>
            </div>
            <div className="priority-stat priority-stat--medium">
              <span className="priority-stat__label">Medium Priority</span>
              <span className="priority-stat__value">{stats.medium}</span>
            </div>
            <div className="priority-stat priority-stat--low">
              <span className="priority-stat__label">Low Priority</span>
              <span className="priority-stat__value">{stats.low}</span>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="profile__section">
          <h2 className="profile__section-title">Account Settings</h2>
          
          {/* Edit Name */}
          <div className="profile__setting">
            <div className="profile__setting-header">
              <div>
                <h3>Display Name</h3>
                <p>{user?.name}</p>
              </div>
              {!isEditingName && (
                <button 
                  className="btn-secondary"
                  onClick={() => setIsEditingName(true)}
                >
                  Edit
                </button>
              )}
            </div>
            
            {isEditingName && (
              <form className="profile__form" onSubmit={handleUpdateName}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter new name"
                  className="profile__input"
                />
                <div className="profile__form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      setIsEditingName(false);
                      setName(user?.name || '');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Change Password */}
          <div className="profile__setting">
            <div className="profile__setting-header">
              <div>
                <h3>Password</h3>
                <p>••••••••</p>
              </div>
              {!isChangingPassword && (
                <button 
                  className="btn-secondary"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Change
                </button>
              )}
            </div>
            
            {isChangingPassword && (
              <form className="profile__form" onSubmit={handleChangePassword}>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  placeholder="Current password"
                  className="profile__input"
                />
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  placeholder="New password"
                  className="profile__input"
                />
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                  className="profile__input"
                />
                <div className="profile__form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="profile__section profile__section--danger">
          <h2 className="profile__section-title">Danger Zone</h2>
          
          <div className="profile__danger">
            <div>
              <h3>Logout</h3>
              <p>Sign out from your account</p>
            </div>
            <button className="btn-warning" onClick={() => setShowLogoutModal(true)}>
              Logout
            </button>
          </div>

          <div className="profile__danger">
            <div>
              <h3>Delete Account</h3>
              <p>Permanently delete your account and all data</p>
            </div>
            <button className="btn-danger" onClick={() => setShowDeleteModal(true)}>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2>Confirm Logout</h2>
              <button className="modal__close" onClick={() => setShowLogoutModal(false)}>
                ×
              </button>
            </div>
            <div className="modal__body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="modal__footer">
              <button className="btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2>Delete Account</h2>
              <button className="modal__close" onClick={() => setShowDeleteModal(false)}>
                ×
              </button>
            </div>
            <div className="modal__body">
              <div className="modal__warning">
                <span className="modal__warning-icon">⚠️</span>
                <p><strong>Warning:</strong> This action cannot be undone. All your tasks and data will be permanently deleted.</p>
              </div>
              <p className="modal__confirm-text">
                Please type <strong>{user?.email}</strong> to confirm:
              </p>
              <input
                type="email"
                value={deleteConfirmEmail}
                onChange={(e) => setDeleteConfirmEmail(e.target.value)}
                placeholder="Enter your email"
                className="profile__input"
              />
            </div>
            <div className="modal__footer">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmEmail('');
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-danger" 
                onClick={handleDeleteAccount}
                disabled={loading || deleteConfirmEmail !== user?.email}
              >
                {loading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;