// components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-spacer"></div>
        
        {/* Profile section with dropdown */}
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

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item">
                <span className="dropdown-icon">👤</span>
                <span>My Profile</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;