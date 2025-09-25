import React, { useState } from "react";
import "@/styles/settings/ProfileSettings.css";

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <h3 className="section-title">Employee Information</h3>

      {/* Profile photo upload */}
      <div className="profile-upload">
        <div className="profile-photo-box">
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <div className="photo-placeholder">
              <span>📷</span>
              <p>Upload Profile Photo</p>
            </div>
          )}
        </div>
        <div className="upload-controls">
          <label className="upload-btn">
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
          <p className="hint">
            For better preview recommended size is 450px x 450px. Max size 5MB.
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input type="text" placeholder="User Name" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Phone Number" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email" />
          </div>
        </div>

        <h4 className="sub-title">Our Address</h4>

        <div className="form-group">
          <label>Address</label>
          <input type="text" placeholder="Enter address" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <input type="text" placeholder="Country" />
          </div>
          <div className="form-group">
            <label>State / Province</label>
            <input type="text" placeholder="State / Province" />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" placeholder="City" />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input type="text" placeholder="Postal Code" />
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileSettings;
