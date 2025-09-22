import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  User,
  Shield,
  Bell,
  Layers,
  Globe,
  Smartphone,
  Cpu,
  DollarSign,
  Sliders,
  ChevronDown,
} from "react-feather";
import "../styles/SettingsLayout.css";

const SettingsLayout = () => {
  const [openMenus, setOpenMenus] = useState({
    general: true,
    website: false,
    app: false,
    system: false,
    financial: false,
    other: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="settings-layout">
      {/* Sidebar */}
      <div className="settings-sidebar">
        {/* General Settings */}
        <h3 className="sidebar-title" onClick={() => toggleMenu("general")}>
          General Settings
          <ChevronDown
            size={16}
            className={`dropdown-icon ${openMenus.general ? "open" : ""}`}
          />
        </h3>
        {openMenus.general && (
          <ul className="settings-menu">
            <li>
              <NavLink to="profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <User size={14} /> Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="security" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Shield size={14} /> Security
              </NavLink>
            </li>
            <li>
              <NavLink to="notifications" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Bell size={14} /> Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="apps" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <Layers size={14} /> Connected Apps
              </NavLink>
            </li>
          </ul>
        )}

        {/* Website Settings */}
        <h3 className="sidebar-title" onClick={() => toggleMenu("website")}>
          Website Settings
          <ChevronDown
            size={16}
            className={`dropdown-icon ${openMenus.website ? "open" : ""}`}
          />
        </h3>
        {openMenus.website && (
          <ul className="settings-menu">
            <li><NavLink to="system-settings">System Settings</NavLink></li>
            <li><NavLink to="company-settings">Company Settings</NavLink></li>
            <li><NavLink to="localization">Localization</NavLink></li>
            <li><NavLink to="prefixes">Prefixes</NavLink></li>
            <li><NavLink to="preference">Preference</NavLink></li>
            <li><NavLink to="appearance">Appearance</NavLink></li>
            <li><NavLink to="social-auth">Social Authentication</NavLink></li>
            <li><NavLink to="language">Language</NavLink></li>
          </ul>
        )}

        {/* App Settings */}
        <h3 className="sidebar-title" onClick={() => toggleMenu("app")}>
          App Settings
          <ChevronDown
            size={16}
            className={`dropdown-icon ${openMenus.app ? "open" : ""}`}
          />
        </h3>
        {openMenus.app && (
          <ul className="settings-menu">
            <li><NavLink to="invoice">Invoice</NavLink></li>
            <li><NavLink to="printer">Printer</NavLink></li>
            <li><NavLink to="pos">POS</NavLink></li>
            <li><NavLink to="custom-fields">Custom Fields</NavLink></li>
          </ul>
        )}

        {/* System Settings */}
        <h3 className="sidebar-title" onClick={() => toggleMenu("system")}>
          System Settings
          <ChevronDown
            size={16}
            className={`dropdown-icon ${openMenus.system ? "open" : ""}`}
          />
        </h3>
        {openMenus.system && (
          <ul className="settings-menu">
            <li><NavLink to="email">Email</NavLink></li>
            <li><NavLink to="sms-gateways">SMS Gateways</NavLink></li>
            <li><NavLink to="otp">OTP</NavLink></li>
            <li><NavLink to="gdpr-cookies">GDPR Cookies</NavLink></li>
          </ul>
        )}

        {/* Financial Settings */}
        <h3 className="sidebar-title" onClick={() => toggleMenu("financial")}>
          Financial Settings
          <ChevronDown
            size={16}
            className={`dropdown-icon ${openMenus.financial ? "open" : ""}`}
          />
        </h3>
        {openMenus.financial && (
          <ul className="settings-menu">
            <li><NavLink to="payment-gateway">Payment Gateway</NavLink></li>
            <li><NavLink to="bank-accounts">Bank Accounts</NavLink></li>
            <li><NavLink to="tax-rates">Tax Rates</NavLink></li>
            <li><NavLink to="currencies">Currencies</NavLink></li>
          </ul>
        )}

        {/* Other Settings */}
        <h3 className="sidebar-title" onClick={() => toggleMenu("other")}>
          Other Settings
          <ChevronDown
            size={16}
            className={`dropdown-icon ${openMenus.other ? "open" : ""}`}
          />
        </h3>
        {openMenus.other && (
          <ul className="settings-menu">
            <li><NavLink to="storage">Storage</NavLink></li>
            <li><NavLink to="ban-ip">Ban IP Address</NavLink></li>
          </ul>
        )}
      </div>

      {/* Content Area */}
      <div className="settings-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;