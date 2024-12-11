// In userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null,
    name: null,
    isVerified: false,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => ({
      id: null,
      email: null,
      name: null,
      isVerified: false,
    }),
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;