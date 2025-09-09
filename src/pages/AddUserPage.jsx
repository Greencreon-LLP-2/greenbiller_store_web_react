// pages/AddUserPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../store/slices/userSlice';
import '../styles/AddUserPage.css';

const AddUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation here
    const newUser = {
      id: Date.now(),
      ...formData,
      createdOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Active',
      avatar: 'assets/img/users/default-user.jpg'
    };
    dispatch(addUser(newUser));
    navigate('/contacts/users');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Add User</h4>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="new-employee-field">
                    <span>Avatar</span>
                    <div className="profile-pic-upload mb-2">
                      <div className="profile-pic">
                        <span><i data-feather="plus-circle" className="plus-down-add"></i> Profile Photo</span>
                      </div>
                      <div className="input-blocks mb-0">
                        <div className="image-upload mb-0">
                          <input type="file" onChange={(e) => {/* Handle file upload */}} />
                          <div className="image-uploads">
                            <h4>Change Image</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>User Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                      <option value="">Choose</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Salesman">Salesman</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Password</label>
                    <div className="pass-group">
                      <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                      <span className="fas toggle-password fa-eye-slash"></span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-blocks">
                    <label>Confirm Password</label>
                    <div className="pass-group">
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                      <span className="fas toggle-password fa-eye-slash"></span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-0 input-blocks">
                    <label className="form-label">Descriptions</label>
                    <textarea className="form-control mb-1" name="description" value={formData.description} onChange={handleChange}>
                      Type Message
                    </textarea>
                    <p>Maximum 600 Characters</p>
                  </div>	
                </div>
              </div>
              <div className="modal-footer-btn">
                <button type="button" className="btn btn-cancel me-2" onClick={() => navigate('/contacts/users')}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;