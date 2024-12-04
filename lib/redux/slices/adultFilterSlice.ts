// lib/redux/slices/adultFilterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdultFilterState {
  isEnabled: boolean;
}

const initialState: AdultFilterState = {
  isEnabled: false
};

export const adultFilterSlice = createSlice({
  name: 'adultFilter',
  initialState,
  reducers: {
    toggleAdultFilter: (state) => {
      state.isEnabled = !state.isEnabled;
    },
    setAdultFilter: (state, action: PayloadAction<boolean>) => {
      state.isEnabled = action.payload;
    }
  }
});

export const { toggleAdultFilter, setAdultFilter } = adultFilterSlice.actions;

export default adultFilterSlice.reducer;