import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  User,
  Globe,
  Smartphone,
  Cpu,
  DollarSign,
  Sliders,
  Shield,
  Bell,
  Layers,
} from "react-feather";
import "../styles/SettingsLayout.css"; // uses your CSS

const SettingsLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="settings-layout">{/* match CSS */} 
      {/* Sidebar */}
      <div className="settings-sidebar">
        <h3
          className="sidebar-title"
          onClick={() => setIsOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          General Settings
        </h3>

        {isOpen && (
          <ul className="settings-menu">{/* match CSS */}
            <li>
              <NavLink to="profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <User size={14} /> Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="security" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Shield size={14} /> Security
              </NavLink>
            </li>
            <li>
              <NavLink to="notifications" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Bell size={14} /> Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="apps" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Layers size={14} /> Connected Apps
              </NavLink>
            </li>
            <li>
              <NavLink to="website" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Globe size={14} /> Website Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="app" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Smartphone size={14} /> App Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="system" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Cpu size={14} /> System Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="financial" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <DollarSign size={14} /> Financial Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="other" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Sliders size={14} /> Other Settings
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* Content Area */}
      <div className="settings-content">{/* match CSS */}
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
