import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
