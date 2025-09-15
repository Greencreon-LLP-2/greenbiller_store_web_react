// layouts/MainLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Add state for mobile sidebar
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // ✅ Toggle function
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <div className="sidebar-section">
        {/* ✅ Pass props to Sidebar */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        <div className="vertical-divider"></div>
      </div>

      <div className="main-section">
        {/* ✅ Pass toggle to Navbar */}
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
