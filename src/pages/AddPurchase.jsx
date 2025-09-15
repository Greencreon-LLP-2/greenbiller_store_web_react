import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiPlusCircle, FiX } from 'react-icons/fi';
import '../styles/AddPurchase.css'

const AddPurchase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplierName: '',
    purchaseDate: '',
    productName: '',
    referenceNo: '',
    orderTax: '0',
    discount: '0',
    shipping: '0',
    status: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // navigate('/purchases'); // Uncomment to navigate after submission
  };

  return (
    <div className="add-purchase-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Add Purchase</h2>
        </div>
        <button 
          type="button" 
          className="close-btn"
          onClick={() => navigate(-1)}
        >
          <FiX />
        </button>
      </div>

      <div className="purchase-content">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group col-lg-3 col-md-6 col-sm-12">
              <label>Supplier Name</label>
              <div className="input-with-addon">
                <select 
                  className="form-select"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                >
                  <option value="">Select Supplier</option>
                  <option value="Apex Computers">Apex Computers</option>
                  <option value="Dazzle Shoes">Dazzle Shoes</option>
                  <option value="Best Accessories">Best Accessories</option>
                </select>
                <div className="add-icon">
                  <button type="button">
                    <FiPlusCircle />
                  </button>
                </div>
              </div>
            </div>

            <div className="input-group col-lg-3 col-md-6 col-sm-12">
              <label>Purchase Date</label>
              <div className="input-with-icon">
                <FiCalendar className="input-icon" />
                <input 
                  type="date" 
                  className="form-control"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group col-lg-3 col-md-6 col-sm-12">
              <label>Product Name</label>
              <select 
                className="form-select"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                <option value="Shoe">Shoe</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            <div className="input-group col-lg-3 col-md-6 col-sm-12">
              <label>Reference No</label>
              <input 
                type="text" 
                className="form-control"
                name="referenceNo"
                value={formData.referenceNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group col-lg-12">
              <label>Product Search</label>
              <input 
                type="text" 
                placeholder="Please type product code and select"
                className="form-control"
              />
            </div>
          </div>

          <div className="product-table-section">
            <div className="table-responsive">
              <table className="purchase-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Purchase Price($)</th>
                    <th>Discount($)</th>
                    <th>Tax(%)</th>
                    <th>Tax Amount($)</th>
                    <th>Unit Cost($)</th>
                    <th>Total Cost($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="8" className="empty-table-message">
                      No products added yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group col-lg-3 col-md-6 col-sm-12">
              <label>Order Tax</label>
              <input 
                type="text" 
                className="form-control"
                name="orderTax"
                value={formData.orderTax}
                onChange={handleChange}
              />
            </div>
            <div className="input-group col-lg-3 col-md-6 col-sm-12">
              <label>Discount</label>
              <input 
                type="text" 
                className="form-control"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>
            <div className="input-group col-lg-3 col-md-6 col-sm-12">
              <label>Shipping</label>
              <input 
                type="text" 
                className="form-control"
                name="shipping"
                value={formData.shipping}
                onChange={handleChange}
              />
            </div>
            <div className="input-group col-lg-3 col-md-6 col-sm-12">
              <label>Status</label>
              <select 
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                <option value="Received">Received</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group col-lg-12">
              <label>Notes</label>
              <textarea 
                className="form-control notes-textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPurchase;