// pages/AddNewCustomer.jsx
import React, { useState } from "react";
import "../styles/AddNewCustomer.css";

const AddNewCustomer = ({ isOpen, onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    avatar: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setFormData({
        ...formData,
        avatar: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a new customer code (in a real app, this would come from the backend)
    const newCode = `CTM${Math.floor(100 + Math.random() * 900)}`;
    
    // Create the new customer object
    const newCustomer = {
      id: Date.now(), // Using timestamp as a simple unique ID
      code: newCode,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: "Active",
      // Additional fields that could be stored
      country: formData.country,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      avatar: previewUrl
    };
    
    onAddCustomer(newCustomer);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      country: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      avatar: null
    });
    setPreviewUrl(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Customer</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="customer-form">
          <div className="form-section">
            <div className="avatar-upload">
              <div className="avatar-preview">
                {previewUrl ? (
                  <img src={previewUrl} alt="Avatar Preview" />
                ) : (
                  <div className="avatar-placeholder">
                    <span>Upload Photo</span>
                  </div>
                )}
              </div>
              <label htmlFor="avatar-upload" className="upload-btn">
                Choose Image
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            
            <div className="form-fields">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pincode">ZIP/Postal Code</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={handleClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCustomer;