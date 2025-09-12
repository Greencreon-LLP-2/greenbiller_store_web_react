// store/slices/customersSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state with mock customers data
const initialState = {
  list: [
    { id: 1, code: "CTM103", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 2, code: "CTM102", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 3, code: "CTM101", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 4, code: "CTM100", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 5, code: "CTM99", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 6, code: "CTM98", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 7, code: "CTM97", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 8, code: "CTM96", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 9, code: "CTM95", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
    { id: 10, code: "CTM94", name: "Walking Customer", email: "walking@example.com", phone: "123-456-7890", status: "Inactive" },
  ],
  loading: false,
  error: null
};

// Create the customers slice
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    // Add a new customer
    addCustomer: (state, action) => {
      state.list.push(action.payload);
    },
    // Update an existing customer
    updateCustomer: (state, action) => {
      const index = state.list.findIndex(customer => customer.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    // Delete a customer
    deleteCustomer: (state, action) => {
      state.list = state.list.filter(customer => customer.id !== action.payload);
    },
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Export actions
export const { addCustomer, updateCustomer, deleteCustomer, setLoading, setError } = customersSlice.actions;

// Export reducer
export default customersSlice.reducer;