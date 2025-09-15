import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/ExpenseForm.css';

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    expenseDate: '15-09-2025',
    category: '',
    expenseFor: '',
    paymentType: '',
    account: '',
    amount: '',
    referenceNo: '',
    note: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    category: false,
    expenseFor: false,
    paymentType: false,
    amount: false
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prevState => ({
        ...prevState,
        [id]: false
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      category: !formData.category,
      expenseFor: !formData.expenseFor.trim(),
      paymentType: !formData.paymentType,
      amount: !formData.amount || parseFloat(formData.amount) <= 0
    };
    
    setErrors(newErrors);
    
    // Check if form is valid
    const isValid = !Object.values(newErrors).includes(true);
    
    if (isValid) {
      alert('Expense saved successfully!');
      // Here you would typically send the data to a server or update state in a parent component
    }
  };

  const handleClose = () => {
    if (
      window.confirm(
        "Are you sure you want to close? Any unsaved changes will be lost."
      )
    ) {
      navigate(-1); 
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add/Update Expense</h2>
      
      <div className="form-container">
        <p className="subtitle">Please Enter Valid Data</p>
        
        <form id="expenseForm" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expenseDate">
                  <span className="required">Expense Date</span>
                </label>
                <input 
                  type="text" 
                  id="expenseDate" 
                  value={formData.expenseDate} 
                  readOnly 
                />
                <div className="error" id="dateError" style={{ display: 'none' }}>
                  Please select a valid date
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="referenceNo">Reference No.</label>
                <input 
                  type="text" 
                  id="referenceNo" 
                  placeholder="Enter reference number"
                  value={formData.referenceNo}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">
                  <span className="required">Category</span>
                </label>
                <select 
                  id="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  required
                >
                  <option value="">-Select-</option>
                  <option value="office">Office Expense</option>
                  <option value="other">Other Expense</option>
                </select>
                <div className="error" id="categoryError" style={{ display: errors.category ? 'block' : 'none' }}>
                  Please select a category
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expenseFor">
                  <span className="required">Expense for</span>
                </label>
                <input 
                  type="text" 
                  id="expenseFor" 
                  placeholder="Enter expense description" 
                  value={formData.expenseFor}
                  onChange={handleChange}
                  required 
                />
                <div className="error" id="expenseForError" style={{ display: errors.expenseFor ? 'block' : 'none' }}>
                  Please enter expense description
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="account">Account</label>
                <select 
                  id="account" 
                  value={formData.account}
                  onChange={handleChange}
                >
                  <option value="">-None-</option>
                  <option value="office">Office Account</option>
                  <option value="revenue">Revenue Account</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="amount">
                  <span className="required">Amount</span>
                </label>
                <input 
                  type="number" 
                  id="amount" 
                  placeholder="Enter amount" 
                  min="0" 
                  step="0.01" 
                  value={formData.amount}
                  onChange={handleChange}
                  required 
                />
                <div className="error" id="amountError" style={{ display: errors.amount ? 'block' : 'none' }}>
                  Please enter a valid amount
                </div>
              </div>
              
              <div className="form-group note-group">
                <label htmlFor="note">Note</label>
                <textarea 
                  id="note" 
                  rows="5" 
                  placeholder="Add any additional notes"
                  value={formData.note}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="paymentType">
                  <span className="required">Payment Type</span>
                </label>
                <select 
                  id="paymentType" 
                  value={formData.paymentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">-Select-</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                </select>
                <div className="error" id="paymentTypeError" style={{ display: errors.paymentType ? 'block' : 'none' }}>
                  Please select a payment type
                </div>
              </div>
            </div>
          </div>
          
          <div className="button-container">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-close" onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;