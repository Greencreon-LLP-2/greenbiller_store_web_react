// components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";
import dashboardIcon from "../assets/dashboard_icon.png";

const Sidebar = ({ isMobileOpen, toggleMobileSidebar }) => {
  const [isContactsOpen, setContactsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

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
      path: "/users",
      label: "Users",
      icon: <i className="bi bi-people"></i>,
    },
    { path: "/sales", label: "Sales", icon: <i className="bi bi-cart"></i> },
    {
      type: "dropdown",
      label: "Contacts",
      icon: <i className="bi bi-person"></i>,
      items: [
        { path: "/customers", label: "> Customers" },
        { path: "/suppliers", label: "> Suppliers" },
      ],
    },
    {
      path: "/purchases",
      label: "Purchase",
      icon: <i className="bi bi-bag"></i>,
    },
    {
      path: "/expenses",
      label: "Expenses",
      icon: <i className="bi bi-currency-dollar"></i>,
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

      <div className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Green Biller Logo" className="sidebar-logo" />
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
                  className={`dropdown-content ${
                    isContactsOpen ? "show" : ""
                  }`}
                >
                  {item.items.map((dropdownItem) => (
                    <NavLink
                      key={dropdownItem.path}
                      to={dropdownItem.path}
                      className={({ isActive }) =>
                        `dropdown-link ${
                          isActive ? "dropdown-link-active" : ""
                        }`
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

          {/* 🔹 Logout Button at Bottom */}
          <div className="nav-item logout" onClick={handleLogout}>
            <span className="nav-icon">
              <i className="bi bi-box-arrow-right"></i>
            </span>
            <span className="nav-label">Logout</span>
          </div>
        </nav>

        {/* 🔹 Footer */}
        <div className="sidebar-footer">
          <p className="footer-link">greenbiller.com</p>
          <p className="footer-version">Version 1.0.0</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
