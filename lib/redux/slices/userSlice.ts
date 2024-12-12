// lib/redux/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState = {
  id: null,
  email: null,
  name: null,
  isVerified: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: (() => {
    // Check if window exists (client-side)
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : initialState;
    }
    return initialState;
  })(),
  reducers: {
    setUser: (state, action) => {
      const newState = { ...state, ...action.payload };
      // Save to localStorage when updating
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newState));
      }
      return newState;
    },
    clearUser: () => {
      // Clear localStorage when logging out
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;