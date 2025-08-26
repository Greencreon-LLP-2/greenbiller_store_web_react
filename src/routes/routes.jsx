// routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import SalesPage from "../pages/SalesPage"; // Import the SalesPage
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "sales", // Add the sales route
            element: <SalesPage />,
          },
          {
            // Redirect to dashboard by default
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);