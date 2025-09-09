// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import suppliersReducer from "./slices/suppliersSlice";


export const store = configureStore({
  reducer: {
    users: userReducer,
    suppliers: suppliersReducer,

  },
});