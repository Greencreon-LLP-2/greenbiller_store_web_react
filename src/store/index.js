import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import suppliersReducer from './slices/suppliersSlice';
import expensesReducer from './slices/expensesSlice';
import purchasesReducer from './slices/purchasesSlice';
import salesReducer from './slices/salesSlice';
import customersReducer from './slices/customersSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    suppliers: suppliersReducer,
    expenses: expensesReducer,
    purchases: purchasesReducer,
    sales: salesReducer,
    customers: customersReducer,
  },
});