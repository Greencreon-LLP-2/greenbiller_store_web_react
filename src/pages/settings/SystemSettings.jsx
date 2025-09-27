import React, { useState } from "react";
import "@/styles/settings/SystemSettings.css";

// Import logos
import captchaLogo from "@/assets/captcha.png";
import analyticsLogo from "@/assets/analytics.png";
import adsenseLogo from "@/assets/adsense.png";
import mapLogo from "@/assets/map.png";

const integrations = [
  {
    title: "Google Captcha",
    description:
      "Captcha helps protect you from spam and password decryption.",
    button: "View Integration",
    logo: captchaLogo,
  },
  {
    title: "Google Analytics",
    description:
      "Provides statistics and basic analytical tools for SEO and marketing purposes.",
    button: "View Integration",
    logo: analyticsLogo,
  },
  {
    title: "Google Adsense Code",
    description:
      "Provides a way for publishers to earn money from their online content.",
    button: "View Integration",
    logo: adsenseLogo,
  },
  {
    title: "Google Map",
    description:
      "Provides detailed information about geographical regions and sites worldwide.",
    button: "View Integration",
    logo: mapLogo,
  },
];

const SystemSettings = () => {
  const [checked, setChecked] = useState({});

  const handleToggle = (title) => {
    setChecked((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">System Settings</h1>

      <div className="settings-grid">
        {integrations.map((item, index) => (
          <div key={index} className="settings-card">
            <div className="card-header">
              <div className="card-left">
                <img src={item.logo} alt={item.title} className="card-logo" />
                <h2 className="card-title">{item.title}</h2>
              </div>

              {/* Toggle switch */}
              <label className="checktoggle">
                <input
                  type="checkbox"
                  checked={!!checked[item.title]}
                  onChange={() => handleToggle(item.title)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <p className="card-desc">{item.description}</p>
            <button className="card-btn">{item.button}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSettings;
