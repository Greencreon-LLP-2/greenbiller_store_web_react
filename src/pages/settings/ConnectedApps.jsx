import React, { useState } from "react";
import "../../styles/settings/ConnectedApps.css";

// Import images from src/assets
import calendarImg from "../../assets/calendar.png";
import figmaImg from "../../assets/figma.png";
import dropboxImg from "../../assets/dropbox.png";
import slackImg from "../../assets/slack.png";
import githubImg from "../../assets/github.png";
import gmailImg from "../../assets/gmail.png";

const apps = [
  { id: 1, name: "Calendar", img: calendarImg, connected: true },
  { id: 2, name: "Figma", img: figmaImg, connected: false },
  { id: 3, name: "Dropbox", img: dropboxImg, connected: true },
  { id: 4, name: "Slack", img: slackImg, connected: false },
  { id: 5, name: "Github", img: githubImg, connected: false },
  { id: 6, name: "Gmail", img: gmailImg, connected: true },
];

const ConnectedApps = () => {
  const [appStatus, setAppStatus] = useState(
    apps.reduce((acc, app) => ({ ...acc, [app.id]: app.connected }), {})
  );

  const toggleApp = (id) => {
    setAppStatus({ ...appStatus, [id]: !appStatus[id] });
  };

  return (
    <div className="connected-apps-section">
      {/* Heading */}
      <h2 className="section-heading">Connected Apps</h2>
      <div className="underline"></div>

      {/* Apps Grid */}
      <div className="row">
        {apps.map((app) => (
          <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6" key={app.id}>
            <div className="connected-app-card">
              <ul>
                <li className="card-row">
                  <div className="app-icon">
                    <img src={app.img} alt={app.name} />
                  </div>
                  <div className="connect-btn">
                    <a href="#">{appStatus[app.id] ? "Connected" : "Connect"}</a>
                  </div>
                </li>
                <li className="card-row">
                  <div className="security-type">
                    <div className="security-title">
                      <h5>{app.name}</h5>
                    </div>
                  </div>
                  <div className="status-toggle">
                    <input
                      type="checkbox"
                      id={`user-${app.id}`}
                      className="check"
                      checked={appStatus[app.id]}
                      onChange={() => toggleApp(app.id)}
                    />
                    <label htmlFor={`user-${app.id}`} className="checktoggle"></label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedApps;
