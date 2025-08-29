// pages/SalesPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 import useNavigate
import "../styles/SalesPage.css";

const SalesPage = () => {
  const navigate = useNavigate(); // 👈 initialize navigate

  return (
    <div className="sales-page">
      <h2 className="title">Sales</h2>
      <p className="subtitle">Manage your sales</p>

      {/* ✅ Actions OUTSIDE sales-content */}
      <div className="actions">
        <button className="btn pdf">PDF</button>
        <button className="btn excel">Excel</button>
        <button className="btn print">Print</button>
        <button className="btn refresh">⟳</button>
        <button className="btn collapse">⌄</button>
        <button className="btn add" onClick={() => navigate("/sales/add")}>
          + Add New Sales
        </button>
      </div>

      {/* White card content */}
      <div className="sales-content">
        {/* Top bar */}
        <div className="top-bar">
          <div className="entries">
            <label>
              Show
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              entries per page
            </label>
          </div>

          <div className="search">
            <label>Search: </label>
            <input type="text" />
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Sale Date</th>
                <th>Sale Code</th>
                <th>Reference</th>
                <th>Customer Name</th>
                <th>Total</th>
                <th>Paid Payment</th>
                <th>Payment Status</th>
                <th>Created by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="10" className="no-data">
                  No matching records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="table-footer">
          <p>Showing 0 to 0 of 0 entries</p>
          <div className="pagination">
            <button>{"<<"}</button>
            <button>{"<"}</button>
            <button>{">"}</button>
            <button>{">>"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;