// store/slices/salesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state with mock sales data
const initialState = {
  list: [
    {
      id: 1,
      saleDate: '2023-05-15',
      saleCode: 'SALE-001',
      reference: 'REF-2023-001',
      customerName: 'John Doe',
      total: 1250.75,
      paidPayment: 1000.00,
      paymentStatus: 'Partial',
      createdBy: 'Admin User'
    },
    {
      id: 2,
      saleDate: '2023-05-16',
      saleCode: 'SALE-002',
      reference: 'REF-2023-002',
      customerName: 'Jane Smith',
      total: 850.50,
      paidPayment: 850.50,
      paymentStatus: 'Paid',
      createdBy: 'Sales Rep'
    },
    {
      id: 3,
      saleDate: '2023-05-17',
      saleCode: 'SALE-003',
      reference: 'REF-2023-003',
      customerName: 'Acme Corp',
      total: 2200.00,
      paidPayment: 0.00,
      paymentStatus: 'Pending',
      createdBy: 'Admin User'
    },
    {
      id: 4,
      saleDate: '2023-05-18',
      saleCode: 'SALE-004',
      reference: 'REF-2023-004',
      customerName: 'XYZ Company',
      total: 1750.25,
      paidPayment: 1750.25,
      paymentStatus: 'Paid',
      createdBy: 'Manager'
    },
    {
      id: 5,
      saleDate: '2023-05-19',
      saleCode: 'SALE-005',
      reference: 'REF-2023-005',
      customerName: 'Bob Wilson',
      total: 950.00,
      paidPayment: 500.00,
      paymentStatus: 'Partial',
      createdBy: 'Sales Rep'
    }
  ],
  loading: false,
  error: null
};

// Create the sales slice
const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    // Add a new sale
    addSale: (state, action) => {
      state.list.push(action.payload);
    },
    // Update an existing sale
    updateSale: (state, action) => {
      const index = state.list.findIndex(sale => sale.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    // Delete a sale
    deleteSale: (state, action) => {
      state.list = state.list.filter(sale => sale.id !== action.payload);
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
export const { addSale, updateSale, deleteSale, setLoading, setError } = salesSlice.actions;

// Export reducer
export default salesSlice.reducer;