import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    {
      id: 1,
      purchaseDate: '2023-10-15',
      purchaseCode: 'P001',
      purchaseStatus: 'Completed',
      referenceNo: 'REF001',
      supplierName: 'Supplier A',
      total: '1000.00',
      paid: '800.00',
      paymentStatus: 'Partial',
      createdBy: 'John Doe'
    },
    {
      id: 2,
      purchaseDate: '2023-10-16',
      purchaseCode: 'P002',
      purchaseStatus: 'Pending',
      referenceNo: 'REF002',
      supplierName: 'Supplier B',
      total: '2000.00',
      paid: '2000.00',
      paymentStatus: 'Paid',
      createdBy: 'Jane Smith'
    }
  ]
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchase: (state, action) => {
      state.list.push(action.payload);
    },
    deletePurchase: (state, action) => {
      state.list = state.list.filter(purchase => purchase.id !== action.payload);
    },
    updatePurchase: (state, action) => {
      const index = state.list.findIndex(purchase => purchase.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    }
  }
});

export const { addPurchase, deletePurchase, updatePurchase } = purchasesSlice.actions;
export default purchasesSlice.reducer;