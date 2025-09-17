// components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import logo1 from "../assets/logo1.png";
import dashboardIcon from "../assets/dashboard_icon.png";

const Sidebar = ({ isMobileOpen, toggleMobileSidebar }) => {
  const [isContactsOpen, setContactsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        { path: "/customers", label: "> Customers" },
        { path: "/suppliers", label: "> Suppliers" },
      ],
    },
    {
      path: "/purchases",
      label: "Purchase",
      icon: <i class="bi bi-bag"></i>
    },
    {
      path: "/expenses",
      label: "Expenses",
      icon: <i class="bi bi-currency-dollar"></i>
    },
  ];

  const toggleContacts = () => {
    setContactsOpen(!isContactsOpen);
  };

  return (
     <>
      {/* Mobile overlay */}
      {isMobile && isMobileOpen && (
        <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>
      )}
      
      <div className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo1} alt="Green Biller Logo" className="sidebar-logo" />
          {isMobile && (
            <button className="sidebar-close" onClick={toggleMobileSidebar}>
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
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
    </>
  );
};

export default Sidebar;
