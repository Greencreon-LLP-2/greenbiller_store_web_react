// components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import logo1 from "../assets/logo1.png";

const Sidebar = () => {
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/sales", label: "Sales", icon: "💰" },
  ];

  return (
    <div className="sidebar">
      <img src={logo1} alt="Green Biller Logo" className="sidebar-logo" />
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "nav-item-active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;