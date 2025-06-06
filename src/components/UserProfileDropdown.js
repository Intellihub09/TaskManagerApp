import React, { useState, useEffect, useRef } from 'react';
import './UserProfileDropdown.css';
import { FaUserCircle, FaCog, FaSignOutAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const UserProfileDropdown = ({ user, onNavigate, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (view) => {
    if(onNavigate) onNavigate(view);
    setIsOpen(false);
  }

  const handleLogout = () => {
    if(onLogout) onLogout(); // Placeholder for actual logout logic
    console.log('Logout action triggered');
    setIsOpen(false);
  }

  return (
    <div className="user-profile-dropdown" ref={dropdownRef}>
      <div className="profile-summary" onClick={toggleDropdown} role="button" tabIndex={0} aria-expanded={isOpen} aria-haspopup="true">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.name || 'User'}'s avatar`} className="profile-avatar" />
        ) : (
          <FaUserCircle className="profile-avatar" style={{ fontSize: '40px', color: '#888' }}/> // Fallback icon
        )}
        <div className="profile-info">
          <span className="profile-name">{user.name || 'User Name'}</span>
          <span className="profile-role">{user.role || 'Member'}</span>
        </div>
        {isOpen ? <FaChevronUp className="dropdown-arrow" /> : <FaChevronDown className="dropdown-arrow" />}
      </div>

      {isOpen && (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <button onClick={() => handleNavigation('profile')}> {/* Assuming a 'profile' view exists */} 
                <FaUserCircle className="dropdown-icon" /> My Profile
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('settings')}>
                <FaCog className="dropdown-icon" /> Settings
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>
                <FaSignOutAlt className="dropdown-icon" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
