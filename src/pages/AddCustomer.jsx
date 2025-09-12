import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCustomer } from "../store/slices/customersSlice";
import "../styles/AddCustomer.css";

const AddCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    description: "",
    avatar: null
  });
  const [imagePreview, setImagePreview] = useState(null);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a new customer ID and code
    const customers = []; // This would come from Redux in a real app
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const newCode = `CTM${newId + 100}`;
    
    // Create the new customer object
    const newCustomer = {
      id: newId,
      code: newCode,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      description: formData.description,
      avatar: formData.avatar,
      status: "Active"
    };
    
    // Dispatch the action to add the customer
    dispatch(addCustomer(newCustomer));
    
    // Navigate back to customers page
    navigate("/customers");
  };

  const handleCancel = () => {
    navigate("/customers");
  };

  return (
    <div className="add-customer-page">
      <div className="add-customer-header">
        <h2>Add New Customer</h2>
        <p>Fill in the details to create a new customer</p>
      </div>

      <div className="add-customer-content">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Profile Image</h3>
            <div className="image-upload-container">
              <div className="image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Customer preview" />
                ) : (
                  <div className="image-placeholder">
                    <i className="bi bi-person-circle"></i>
                  </div>
                )}
              </div>
              <div className="image-upload-controls">
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="avatar" className="btn-upload">
                  Choose Image
                </label>
                <p className="file-name">
                  {imagePreview ? "Image selected" : "No file chosen"}
                </p>
                {imagePreview && (
                  <button
                    type="button"
                    className="btn-change"
                    onClick={() => document.getElementById("avatar").click()}
                  >
                    Change Image
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Customer Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Customer Name *</label>
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

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
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;