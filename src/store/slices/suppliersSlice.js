import { createSlice } from "@reduxjs/toolkit";

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: {
    list: [
      {
        id: 1,
        name: "Global Textiles",
        code: "211",
        email: "info@globaltextiles.com",
        phone: "+18943670365",
        country: "India",
        image: "https://via.placeholder.com/40x40.png?text=Textiles",
        createdAt: "2024-08-01T10:30:00Z",
      },
      {
        id: 2,
        name: "FreshMart Traders",
        code: "212",
        email: "contact@freshmart.com",
        phone: "+12568749035",
        country: "Angola",
        image: "https://via.placeholder.com/40x40.png?text=Mart",
        createdAt: "2024-09-15T14:45:00Z",
      },
      {
        id: 3,
        name: "Elite Footwear",
        code: "213",
        email: "support@elitefootwear.com",
        phone: "+17589201739",
        country: "Albania",
        image: "https://via.placeholder.com/40x40.png?text=Shoes",
        createdAt: "2024-07-20T09:00:00Z",
      },
    ],
  },
  reducers: {
    addSupplier: (state, action) => {
      const newSupplier = {
        ...action.payload,
        id: Date.now(),
        createdAt: action.payload.createdAt || new Date().toISOString(),
      };
      state.list.push(newSupplier);
    },
    deleteSupplier: (state, action) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSupplier, deleteSupplier } = suppliersSlice.actions;
export default suppliersSlice.reducer;