// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import avatarImage from '../../assets/image.png';

const initialState = {
  users: [
    {
      id: 1,
      name: 'Thomas',
      phone: '+12163547758',
      email: 'thomas@example.com',
      role: 'Admin',
      createdOn: '19 Jan 2023',
      status: 'Inactive',
      avatar: avatarImage
    },
    {
      id: 1,
      name: 'Thomas',
      phone: '+12163547758',
      email: 'thomas@example.com',
      role: 'Admin',
      createdOn: '19 Jan 2023',
      status: 'active',
      avatar: avatarImage
    },
    {
      id: 1,
      name: 'Thomas',
      phone: '+12163547758',
      email: 'thomas@example.com',
      role: 'Admin',
      createdOn: '19 Jan 2023',
      status: 'Inactive',
      avatar: avatarImage
    },
    {
      id: 1,
      name: 'Thomas',
      phone: '+12163547758',
      email: 'thomas@example.com',
      role: 'Admin',
      createdOn: '19 Jan 2023',
      status: 'active',
      avatar: avatarImage
    },
    // Add other mock users from your HTML
  ],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    }
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;