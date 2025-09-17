import React, { useState } from "react";
import "../styles/AddSupplier.css";

const AddnewSupplier = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Supplier Data:", { ...formData, image });
    alert("Supplier saved successfully ✅");
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      description: "",
    });
    setImage(null);
  };

  return (
    <div className="supplier-page">
      <div className="supplier-container">
        <h1 className="supplier-title">Add Supplier</h1>

        <div className="form-layout">
          {/* Avatar Section */}
          <div className="left-avatar">
  <div className="avatar-upload-row">
    <div className="avatar-preview">
      {image ? (
        <img src={image} alt="avatar" className="avatar-img" />
      ) : (
        <span className="placeholder-text">Profile Photo</span>
      )}
    </div>
    <div>
      <input
        type="file"
        id="avatarInput"
        className="hidden-input"
        onChange={handleImageChange}
      />
      <label htmlFor="avatarInput" className="change-img-btn">
        {image ? "Change Image" : "Upload Image"}
      </label>
    </div>
  </div>
</div>


          {/* Form Section */}
          <form onSubmit={handleSubmit} className="supplier-form">
            <div className="form-row three-cols">
              <div className="form-group">
                <label htmlFor="name">Supplier Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="supplier-input"
                  placeholder="Enter supplier name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="supplier-input"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="supplier-input"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="supplier-input"
                  placeholder="Enter address"
                />
              </div>
            </div>

            <div className="form-row two-cols">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="supplier-input"
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="supplier-input"
                  placeholder="Enter country"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="description">Descriptions</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={600}
                  className="supplier-textarea"
                  placeholder="Enter supplier description (max 600 characters)"
                ></textarea>
                <div className="char-count">
                  {formData.description.length}/600
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="supplier-btn-orange">
                Save Supplier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddnewSupplier;