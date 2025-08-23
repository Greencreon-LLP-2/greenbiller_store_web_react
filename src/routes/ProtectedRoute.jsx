import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // 🔹 Only check localStorage (mock mode)
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
