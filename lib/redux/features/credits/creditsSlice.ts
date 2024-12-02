import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserCredits } from '@/types/database';

// Define initial state interface
interface CreditsState {
  credits: UserCredits | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: CreditsState = {
  credits: null,
  status: 'idle',
  error: null
};

// Async thunk to fetch credits
export const fetchUserCredits = createAsyncThunk(
  'credits/fetchUserCredits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/credits/check');
      
      if (!response.ok) {
        throw new Error('Failed to fetch credits');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching credits:', error);
      return rejectWithValue('Failed to fetch credits');
    }
  }
);

// Async thunk to use a credit
export const useCredit = createAsyncThunk(
  'credits/useCredit',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('/api/credits/use', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to use credit');
      }

      // Refresh credits after using one
      await dispatch(fetchUserCredits());
      return true;
    } catch (error) {
      console.error('Error using credit:', error);
      return rejectWithValue('Failed to use credit');
    }
  }
);

// Create the slice
const creditsSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch credits cases
      .addCase(fetchUserCredits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserCredits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.credits = action.payload;
      })
      .addCase(fetchUserCredits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Use credit cases
      .addCase(useCredit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(useCredit.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(useCredit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default creditsSlice.reducer;