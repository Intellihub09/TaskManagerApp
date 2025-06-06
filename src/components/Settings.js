import React, { useState } from 'react';
import './Placeholder.css'; // Using Placeholder CSS for now

const Settings = ({ currentThemeColor, onThemeColorChange }) => {
  const [tempColor, setTempColor] = useState(currentThemeColor);

  const availableColors = [
    { name: 'Neon Green', value: '#00FFAA' },
    { name: 'Cyber Pink', value: '#FF00AA' },
    { name: 'Electric Blue', value: '#00AAFF' },
    { name: 'Laser Lemon', value: '#FFFFAA' },
    { name: 'Pulse Purple', value: '#AA00FF' },
    { name: 'Synth Orange', value: '#FFAA00' },
  ];

  const handleColorChange = (event) => {
    setTempColor(event.target.value);
  };

  const applyThemeColor = () => {
    onThemeColorChange(tempColor);
    // Potentially save to localStorage here if persistence is needed across sessions
    localStorage.setItem('taskManagerThemeColor', tempColor);
  };

  // Function to toggle light/dark mode (basic example)
  const toggleTheme = () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('taskManagerThemeMode', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  };

  // Load theme mode on component mount
  React.useEffect(() => {
    const savedMode = localStorage.getItem('taskManagerThemeMode');
    if (savedMode === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme'); // Default to dark
    }
    const savedColor = localStorage.getItem('taskManagerThemeColor');
    if (savedColor) {
        onThemeColorChange(savedColor);
        setTempColor(savedColor);
    }
  }, [onThemeColorChange]);

  return (
    <div className="placeholder-container settings-container glass">
      {/* <h2>Settings</h2> */}
      
      <div className="setting-item glass-hover">
        <h3>Theme Accent Color</h3>
        <div className="color-options">
          {availableColors.map(color => (
            <button 
              key={color.value} 
              className={`color-swatch ${tempColor === color.value ? 'active' : ''}`}
              style={{ backgroundColor: color.value, boxShadow: tempColor === color.value ? `0 0 8px ${color.value}` : 'none' }}
              title={color.name}
              onClick={() => setTempColor(color.value)}
            />
          ))}
        </div>
        <div className="custom-color-picker">
            <input type="color" value={tempColor} onChange={handleColorChange} />
            <span>{tempColor}</span>
        </div>
        <button onClick={applyThemeColor} className="primary" style={{marginTop: '10px'}}>Apply Color</button>
      </div>

      <div className="setting-item glass-hover">
        <h3>Appearance Mode</h3>
        <button onClick={toggleTheme} className="primary">
          Toggle Light/Dark Mode
        </button>
        <p>Current mode: {document.body.classList.contains('light-theme') ? 'Light' : 'Dark'}</p>
      </div>

      <div className="setting-item glass-hover">
        <h3>Notifications</h3>
        <p>Notification settings (e.g., email, push) would go here.</p>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label> Enable Desktop Notifications (Example)
      </div>

      <div className="setting-item glass-hover">
        <h3>Account</h3>
        <p>Account management options (e.g., change password, export data) would go here.</p>
        <button>Change Password</button>
      </div>

      <style jsx>{`
        .settings-container {
          align-items: flex-start; /* Align items to the start for a list-like feel */
          gap: 25px;
        }
        .setting-item {
          width: 100%;
          padding: 20px;
          border-radius: 10px;
        }
        .setting-item h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: var(--neon-accent-color);
        }
        .color-options {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .color-swatch {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .color-swatch:hover {
            transform: scale(1.1);
        }
        .color-swatch.active {
          border-color: #fff; /* White border for active swatch */
        }
        .custom-color-picker {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
        }
        .custom-color-picker input[type="color"] {
            width: 40px;
            height: 40px;
            border: none;
            padding: 0;
            border-radius: 8px;
            cursor: pointer;
        }
        .custom-color-picker span {
            font-family: monospace;
        }
        /* Basic switch for example */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
          margin-right: 10px;
        }
        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #333;
          transition: .4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: var(--neon-accent-color);
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 24px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Settings;
