// components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  XCircle,
  Mail,
  Bell,
  Settings,
  Maximize,
  HelpCircle,
} from "react-feather";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);

  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const notifications = [
    { id: 1, text: "New order placed", time: "4 mins ago" },
    { id: 2, text: "Stock level low", time: "10 mins ago" },
  ];

  const recentSearches = ["Products", "Sales", "Orders"];

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-spacer" />

        {/* ---- Feature Icons ---- */}
        <ul className="nav-items">
          {/* Search */}
          <li className="nav-item" ref={searchRef}>
            <button
              className="icon-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={18} />
            </button>
            {isSearchOpen && (
              <div className="dropdown-panel search-panel">
                <div className="search-header">
                  <input type="text" placeholder="Search..." autoFocus />
                  <XCircle
                    size={16}
                    className="clear-icon"
                    onClick={() => setIsSearchOpen(false)}
                  />
                </div>
                <div className="recent-section">
                  <h6>Recent Searches</h6>
                  <ul>
                    {recentSearches.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="help-section">
                  <h6>
                    <HelpCircle size={14} /> Help
                  </h6>
                  <p>How to update inventory</p>
                </div>
              </div>
            )}
          </li>

          {/* Fullscreen */}
          <li className="nav-item">
            <button className="icon-btn" onClick={toggleFullscreen}>
              <Maximize size={18} />
            </button>
          </li>

          {/* Mail */}
          <li className="nav-item">
            <button className="icon-btn">
              <Mail size={18} />
              <span className="badge">1</span>
            </button>
          </li>

          {/* Notifications */}
          <li className="nav-item" ref={notificationsRef}>
            <button
              className="icon-btn"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={18} />
              <span className="badge">{notifications.length}</span>
            </button>
            {isNotificationsOpen && (
              <div className="dropdown-panel notification-panel">
                <div className="panel-header">Notifications</div>
                <ul>
                  {notifications.map((n) => (
                    <li key={n.id}>
                      <p>{n.text}</p>
                      <small>{n.time}</small>
                    </li>
                  ))}
                </ul>
                <div className="panel-footer">
                  <a href="#all">View all</a>
                </div>
              </div>
            )}
          </li>

          {/* Settings shortcut */}
          <li className="nav-item">
            <button className="icon-btn">
              <Settings size={18} />
            </button>
          </li>
        </ul>

        {/* ---- Existing Profile untouched ---- */}
        <div className="navbar-profile-container" ref={dropdownRef}>
          <div
            className="navbar-profile"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <i className="bi bi-person-square text-2xl"></i>
            <div className="profile-info">
              <p className="profile-name">Store Admin</p>
              <p className="profile-role">Admin</p>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item" onClick={handleProfile}>
                <span className="dropdown-icon">👤</span>{" "}
                <span>My Profile</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span> <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
