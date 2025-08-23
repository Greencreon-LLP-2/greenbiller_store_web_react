import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login");
  }, []);

  return <Outlet />;
};

export default AuthLayout;
