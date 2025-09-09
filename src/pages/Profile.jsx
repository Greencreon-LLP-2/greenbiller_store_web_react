import React, { useState } from "react";
import "../styles/profile.css";

const Profile = () => {
  // Initial state (mock data)
  const [formData, setFormData] = useState({
    username: "admin",
    firstName: "Chris",
    lastName: "Morris",
    mobile: "9999999999",
    email: "admin@example.com",
    role: "Store Admin",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">
        Edit User <span className="subtitle">Enter User Information</span>
      </h2>

      <form className="profile-form" onSubmit={handleUpdate}>
        <div className="form-left">
          <label>
            Username*  
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label>
            First Name*  
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>

          <label>
            Last Name*  
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>

          <label>
            Mobile*  
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </label>

          <label>
            Email*  
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Role*  
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option>Store Admin</option>
              <option>Manager</option>
              <option>Staff</option>
            </select>
          </label>

          <label>
            Password  
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <label>
            Confirm Password  
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-right">
          <label>Profile Picture</label>
          <input type="file" />
          <p className="hint">Max Width/Height: 500px × 500px & Size: 500Kb</p>
          <div className="profile-img-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3048/3048122.png"
              alt="Profile Avatar"
            />
          </div>
        </div>
      </form>

      <div className="form-actions">
        <button type="submit" className="btn update" onClick={handleUpdate}>
          Update
        </button>
        <button type="button" className="btn close" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Profile;