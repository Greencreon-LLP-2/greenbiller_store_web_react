// routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import SettingsLayout from "../layouts/SettingsLayout";

import DashboardPage from "../pages/DashboardPage";
import SalesPage from "../pages/SalesPage";
import LoginPage from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
// Import the new pages
import CustomersPage from "../pages/CustomersPage";
import AddCustomer from "../pages/AddCustomer";
import SuppliersPage from "../pages/SuppliersPage";
import AddnewSupplier from "../pages/AddnewSupplier";
import UsersPage from "../pages/UsersPage";
import AddSales from "../pages/AddnewSales";
// import AddNewCustomer from "../pages/AddNewCustomer";
import AddUserPage from "../pages/AddUserPage";
import ExpensePage from "../pages/ExpensePage";
import ExpenseForm from "../pages/ExpenseForm";
import PurchasePage from "../pages/PurchasePage";
import AddPurchase from "../pages/AddPurchase";
import Profile from "../pages/Profile";

import ProfileSettings from "../pages/settings/ProfileSettings";
import SecurityPage from "../pages/settings/SecurityPage";

import ConnectedApps from "../pages/settings/ConnectedApps";

import SystemSettings from "../pages/settings/SystemSettings";
import CompanySettings from "../pages/settings/CompanySettings";
import LocalizationSettings from "../pages/settings/LocalizationSettings";
import PrefixesSettings from "../pages/settings/PrefixesSettings";
import PreferenceSettings from "../pages/settings/PreferenceSettings";
import AppearanceSettings from "../pages/settings/AppearanceSettings";
import SocialAuthSettings from "../pages/settings/SocialAuthSettings";
import LanguageSettings from "../pages/settings/LanguageSettings";
import InvoiceSettings from "../pages/settings/InvoiceSettings";
import PrinterSettings from "../pages/settings/PrinterSettings";
import POSSettings from "../pages/settings/POSSettings";
import CustomFieldsSettings from "../pages/settings/CustomFieldsSettings";
import EmailSettings from "../pages/settings/EmailSettings";
import SMSGateways from "../pages/settings/SMSGateways";
import OTPSettings from "../pages/settings/OTPSettings";
import GDPRSettings from "../pages/settings/GDPRSettings";
import PaymentGateway from "../pages/settings/PaymentGateway";
import BankAccounts from "../pages/settings/BankAccounts";
import TaxRates from "../pages/settings/TaxRates";
import Currencies from "../pages/settings/Currencies";
import StorageSettings from "../pages/settings/StorageSettings";
import BanIP from "../pages/settings/BanIP";
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
              { index: true, element: <CustomersPage /> },
              { path: "add", element: <AddCustomer /> },
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
            children: [
              { index: true, element: <SuppliersPage /> },
              { path: "add", element: <AddnewSupplier /> },
            ],
          },
             {
  path: "settings",
  element: <SettingsLayout />,
  children: [
    { path: "profile", element: <ProfileSettings /> },
    { path: "security", element: <SecurityPage /> },
    
   { path: "apps", element: <ConnectedApps /> },


    { path: "system-settings", element: <SystemSettings /> },
    { path: "company-settings", element: <CompanySettings /> },
    { path: "localization", element: <LocalizationSettings /> },
    { path: "prefixes", element: <PrefixesSettings /> },
    { path: "preference", element: <PreferenceSettings /> },
    { path: "appearance", element: <AppearanceSettings /> },
    { path: "social-authentication", element: <SocialAuthSettings /> },
    { path: "language", element: <LanguageSettings /> },

    { path: "invoice", element: <InvoiceSettings /> },
    { path: "printer", element: <PrinterSettings /> },
    { path: "pos", element: <POSSettings /> },
    { path: "custom-fields", element: <CustomFieldsSettings /> },

    { path: "email", element: <EmailSettings /> },
    { path: "sms-gateways", element: <SMSGateways /> },
    { path: "otp", element: <OTPSettings /> },
    { path: "gdpr-cookies", element: <GDPRSettings /> },

    { path: "payment-gateway", element: <PaymentGateway /> },
    { path: "bank-accounts", element: <BankAccounts /> },
    { path: "tax-rates", element: <TaxRates /> },
    { path: "currencies", element: <Currencies /> },

    { path: "storage", element: <StorageSettings /> },
    { path: "ban-ip-address", element: <BanIP /> },
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
