// components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import logo1 from "../assets/logo1.png";
import dashboardIcon from "../assets/dashboard_icon.png";

const Sidebar = () => {
  const [isContactsOpen, setContactsOpen] = useState(false);

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: (
        <img
          src={dashboardIcon}
          alt="dashboard"
          style={{ width: 20, height: 20 }}
        />
      ),
    },
    {
    path: "/users",   // <-- direct link
    label: "Users",
    icon: <i className="bi bi-people"></i>, // pick any Bootstrap icon you like
  },
    { path: "/sales", label: "Sales", icon: <i className="bi bi-cart"></i> },
    {
      type: "dropdown",
      label: "Contacts",
      icon: <i class="bi bi-person"></i>,
      items: [
        { path: "/contacts/customers", label: "> Customers" },
        { path: "/contacts/suppliers", label: "> Suppliers" },
        // { path: "/contacts/users", label: "> Users" },
      ],
    },
    {
      path: "",
      label: "Purchase",
      icon: <i class="bi bi-bag"></i>
    },
    {
      path: "",
      label: "Expenses",
      icon: <i class="bi bi-currency-dollar"></i>
    },
  ];

  const toggleContacts = () => {
    setContactsOpen(!isContactsOpen);
  };

  return (
    <div className="sidebar">
      <img src={logo1} alt="Green Biller Logo" className="sidebar-logo" />
      <nav className="sidebar-nav">
        {navItems.map((item) =>
          item.type === "dropdown" ? (
            <div key={item.label} className="dropdown-wrapper">
              <div
                className={`nav-item dropdown-toggle ${
                  isContactsOpen ? "dropdown-open" : ""
                }`}
                onClick={toggleContacts}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <span className="dropdown-arrow">
                  {isContactsOpen ? "" : ""}
                </span>
              </div>

              <div
                className={`dropdown-content ${isContactsOpen ? "show" : ""}`}
              >
                {item.items.map((dropdownItem) => (
                  <NavLink
                    key={dropdownItem.path}
                    to={dropdownItem.path}
                    className={({ isActive }) =>
                      `dropdown-link ${isActive ? "dropdown-link-active" : ""}`
                    }
                  >
                    {dropdownItem.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
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
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
