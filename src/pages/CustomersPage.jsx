// pages/CustomerPage.jsx
import React, { useState } from "react";
import "../styles/CustomersPage.css";
import AddNewCustomer from "./AddNewCustomer";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, code: "CTM103", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 2, code: "CTM102", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 3, code: "CTM101", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 4, code: "CTM100", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 5, code: "CTM99", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 6, code: "CTM98", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
     { id: 3, code: "CTM101", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 4, code: "CTM100", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 5, code: "CTM99", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 6, code: "CTM98", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 7, code: "CTM97", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
  ]);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    avatar: null
  });

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

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCustomer({
        ...newCustomer,
        avatar: URL.createObjectURL(file)
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a new customer code
    const newCode = `CTM${customers.length + 100}`;
    
    // Add the new customer to the list
    const newCustomerObj = {
      id: customers.length + 1,
      code: newCode,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      status: "Active"
    };
    
    setCustomers([...customers, newCustomerObj]);
    
    // Reset form and close modal
    setNewCustomer({
      name: "",
      email: "",
      country: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      avatar: null
    });
    
    setIsModalOpen(false);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
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
          onClick={() => setIsModalOpen(true)} // Open modal on click
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
                      <button className="action-btn">💶</button>
                      <button className="action-btn">💷</button>
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
      <AddNewCustomer 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCustomer={handleAddCustomer}
      />
    </div>
  );
};

export default CustomersPage;