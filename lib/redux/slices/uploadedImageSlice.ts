import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface UploadedImageState {
  image: string | null;
}

// Initial state
const initialState: UploadedImageState = {
  image: null
};

// Create the slice
export const uploadedImageSlice = createSlice({
  name: 'uploadedImage',
  initialState,
  reducers: {
    // Action to set the uploaded image
    setUploadedImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
    // Optional: Clear the image
    clearUploadedImage: (state) => {
      state.image = null;
    }
  }
});

// Export the actions
export const { setUploadedImage, clearUploadedImage } = uploadedImageSlice.actions;

// Export the reducer
export default uploadedImageSlice.reducer;