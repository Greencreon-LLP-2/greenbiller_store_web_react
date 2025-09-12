// pages/CustomersPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCustomer } from "../store/slices/customersSlice";
import { useNavigate } from "react-router-dom";
import "../styles/CustomersPage.css";

const CustomersPage = () => {
  const customers = useSelector((state) => state.customers.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    Object.values(customer).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + entriesPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="sales-page">
      <h2 className="title">Customers</h2>
      <p className="subtitle">Manage your Customers</p>
      
      <div className="actions">
        <button className="btn pdf">PDF</button>
        <button className="btn excel">Excel</button>
        <button className="btn print">Print</button>
        <button className="btn refresh">⟳</button>
        <button className="btn collapse">⌄</button>
        <button 
          className="btn add" 
          onClick={() => navigate("/customers/add")} 
        >
          + Add New Customer
        </button>      
      </div>
      
      <div className="sales-content">
        {/* Top bar */}
        <div className="top-bar">
          <div className="entries">
            <label> Show 
              <select 
                value={entriesPerPage} 
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select> entries per page 
            </label>
          </div>
          
          <div className="search">
            <label>Search: </label>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        
        {/* Table */}
        <div className="table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Code</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            
            <tbody>
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{customer.code}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <span className={`status ${customer.status.toLowerCase()}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn"><i className="bi bi-pencil-square"></i></button>
                      <button className="action-btn"><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="table-footer">
          <p>
            Showing {filteredCustomers.length > 0 ? startIndex + 1 : 0} to{" "}
            {Math.min(startIndex + entriesPerPage, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} entries
          </p>
          
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(1)} 
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
            <button 
              onClick={() => handlePageChange(totalPages)} 
              disabled={currentPage === totalPages}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
