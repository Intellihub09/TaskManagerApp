import React from 'react';
import './Sidebar.css';
import { 
    FaTachometerAlt, FaTasks, FaCalendarAlt, FaStickyNote, 
    FaChartBar, FaCog, FaChevronLeft, FaChevronRight, FaRocket 
} from 'react-icons/fa';
import UserProfileDropdown from './UserProfileDropdown'; // Assuming this will be created

const Sidebar = ({ activeView, onNavigate, isCollapsed, onToggleCollapse }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, view: 'dashboard' },
    { id: 'taskboard', label: 'Task Board', icon: <FaTasks />, view: 'taskboard' },
    { id: 'calendar', label: 'Calendar', icon: <FaCalendarAlt />, view: 'calendar' },
    { id: 'notes', label: 'Notes', icon: <FaStickyNote />, view: 'notes' },
    { id: 'analytics', label: 'Analytics', icon: <FaChartBar />, view: 'analytics' },
    { id: 'settings', label: 'Settings', icon: <FaCog />, view: 'settings' },
  ];

  const user = {
    name: 'User Name',
    avatar: 'https://via.placeholder.com/40' // Placeholder avatar
  };

  return (
    <aside className={`sidebar glass ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <a href="#" className="logo" onClick={() => onNavigate('dashboard')}>
          <FaRocket className="logo-icon" />
          {!isCollapsed && <span className="logo-text">TaskFlow</span>}
        </a>
      </div>

      <nav className="nav-menu">
        <ul>
          {navItems.map(item => (
            <li key={item.id} className="nav-item">
              <a 
                href={`#${item.view}`}
                className={`nav-link ${activeView === item.view ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); onNavigate(item.view); }}
                title={item.label}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-text">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed && <UserProfileDropdown user={user} />}
        <button onClick={onToggleCollapse} className="toggle-btn" aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
