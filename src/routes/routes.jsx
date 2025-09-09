// routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import SalesPage from "../pages/SalesPage";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
// Import the new pages
import CustomersPage from "../pages/CustomersPage";
import SuppliersPage from "../pages/SuppliersPage";
import UsersPage from "../pages/UsersPage";
import AddSales from "../pages/AddnewSales";
import AddNewCustomer from "../pages/AddNewCustomer";
import AddUserPage from "../pages/AddUserPage";
import Profile from "../pages/Profile";

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
            path: "users",
            children: [
              { index: true, element: <UsersPage /> },
              { path: "add", element: <AddUserPage /> },
            ],
          },
          {
            path: "sales",
            element: <SalesPage />,
          },
          {
            path: "sales/add",
            element: <AddSales />,
          },
          { path: "/profile", element: <Profile /> },
          {
            path: "contacts",
            children: [
              {
                path: "customers",
                element: <CustomersPage />,
              },
              {
                path: "customers/add",
                element: <AddNewCustomer />, // You would need to create this page component
              },
              {
                path: "suppliers",
                element: <SuppliersPage />,
              },
            ],
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
