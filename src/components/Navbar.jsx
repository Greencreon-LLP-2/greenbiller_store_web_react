// components/Navbar.jsx
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Settings,
  Maximize,
  HelpCircle,
  MoreVertical,
} from "react-feather";
import "../styles/Navbar.css";

const Navbar = ({ toggleMobileSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProfile = () => {
    navigate("/profile");
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
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

  return (
    <div className="navbar">
      <div className="navbar-content">
        {isMobile && (
          <button className="mobile-menu-btn" onClick={toggleMobileSidebar}>
            <i className="bi bi-list"></i>
          </button>
        )}
        <div className="navbar-spacer" />

        {/* ---- Feature Icons ---- */}
        {!isMobile && (
          <ul className="nav-items">
            {/* Fullscreen */}
            <li className="nav-item">
              <button className="icon-btn" onClick={toggleFullscreen}>
                <Maximize size={18} />
              </button>
            </li>

            {/* Notifications */}
            <li className="nav-item" ref={notificationsRef}>
              <button
                className="icon-btn"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={18} />
                {/* <span className="badge">{notifications.length}</span> */}
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
              <Link to="/settings/profile" className="icon-btn">
                <Settings size={18} />
              </Link>
            </li>
          </ul>
        )}

        {isMobile && (
          <div className="mobile-menu-container" ref={mobileMenuRef}>
            <button
              className="mobile-menu-icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MoreVertical size={20} />
            </button>

            {isMobileMenuOpen && (
              <div className="mobile-menu-dropdown">
                <div className="mobile-profile-info">
                  <p className="profile-name">Store Admin</p>
                  <p className="profile-role">Admin</p>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleProfile}>
                  <span className="dropdown-icon">👤</span>{" "}
                  <span>My Profile</span>
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  <span className="dropdown-icon">🚪</span> <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---- Profile ---- */}
        {!isMobile && (
          <div className="navbar-profile-container" ref={dropdownRef}>
            <div
              className="navbar-profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <i
                className="bi bi-person-square"
                style={{ fontSize: "2rem" }}
              ></i>
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
