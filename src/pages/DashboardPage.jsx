import React from "react";
import "../styles/Dashboard.css";


const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* <h1 className="page-title">Dashboard</h1> */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Customers</h3>
            <i className="bi bi-person-fill metric-icon"></i>
          </div>
          {/* <p className="metric-value"> </p> */}
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Packages</h3>
            <i className="bi bi-person-check-fill metric-icon"></i>
          </div>
          {/* <p className="metric-value">170</p> */}
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Purchase Invoice</h3>
            <i className="bi bi-receipt-cutoff metric-icon"></i>
          </div>
          <p className="metric-value">150</p>
        </div>
        <div className="metric-card">
          <div className="metric-header">
            <h3 className="metric-title">Sales</h3>
            <i className="bi bi-receipt metric-icon"></i>
          </div>
          {/* <p className="metric-value">$12.4k</p> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;