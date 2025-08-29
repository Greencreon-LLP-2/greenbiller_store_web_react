import React, { useState } from "react";
import "../styles/AddSales.css";

const AddSales = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null; // hide modal when closed

  return (
    <div className="addsales-overlay">
      <div className="addsales-modal">
        
        {/* Close Button */}
        <button className="addsales-close" onClick={() => setIsOpen(false)}>
          ✖
        </button>

        {/* --- Form Section --- */}
        <h3 className="addsales-section-title">Add Sale</h3>
        <form className="addsales-form-grid">
          {/* Customer Name */}
          <div className="addsales-form-group">
            <label>Customer Name</label>
            <select>
              <option value="">-- Choose --</option>
              <option value="customer1">Customer 1</option>
              <option value="customer2">Customer 2</option>
            </select>
          </div>

          {/* Date */}
          <div className="addsales-form-group">
            <label>Date</label>
            <input type="date" />
          </div>

          {/* Supplier */}
          <div className="addsales-form-group">
            <label>Supplier</label>
            <select>
              <option value="">-- Choose --</option>
              <option value="supplier1">Supplier 1</option>
              <option value="supplier2">Supplier 2</option>
            </select>
          </div>

          {/* Product Code */}
         
        </form>

        {/* --- Product Name Separate Row --- */}
        <div className="addsales-productname-row">
          <label>Product Name</label>
          <input type="text" placeholder="Please type product code and select" />
        </div>

        {/* --- Divider Line --- */}
        <hr className="addsales-divider" />

        {/* --- Table Section --- */}
       

        

          <div className="addsales-search">
            
            <input type="text"placeholder="Search" />
          </div>
        

        <div className="addsales-table-wrapper">
          <table className="addsales-table">
            <thead>
              <tr>
                
                <th>Product</th>
                <th>Qty</th>
                <th>Purchase</th>
                <th>Discount</th>
                <th>Tax(%)</th>
                <th>Tax Amount($)</th>
                <th>Unit Cost($)</th>
                <th>Total Cost(%)</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="10" className="addsales-no-data">
                  No matching records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
         <label>
              
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
             
            </label>

        <div className="addsales-table-footer">
          <div className="addsales-pagination">
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

export default AddSales;