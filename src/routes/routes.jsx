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
import AddCustomer from "../pages/AddCustomer";
import SuppliersPage from "../pages/SuppliersPage";
import UsersPage from "../pages/UsersPage";
import AddSales from "../pages/AddnewSales";
// import AddNewCustomer from "../pages/AddNewCustomer";
import AddUserPage from "../pages/AddUserPage";
import ExpensePage from "../pages/ExpensePage";
import ExpenseForm from "../pages/ExpenseForm";
import PurchasePage from "../pages/PurchasePage";
import AddPurchase from "../pages/AddPurchase";
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
            path: "customers",
            children: [
              { index: true, element: <CustomersPage />},
              { path: "add", element: <AddCustomer />}
            ]
          },
          {
            path: "sales",
            element: <SalesPage />,
          },
          {
            path: "sales/add",
            element: <AddSales />,
          },
          {
            path: "expenses",
            children: [
              { index: true, element: <ExpensePage /> },
              { path: "add", element: <ExpenseForm /> },
            ],
          },
          {
            path: "purchases",
            children: [
              { index: true, element: <PurchasePage /> },
              { path: "create", element: <AddPurchase /> },
            ],
          },
          { path: "profile", element: <Profile /> },
          {
            path: "suppliers",
            element: <SuppliersPage />,
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
