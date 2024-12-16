// lib/redux/slices/selectedImagesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SelectedImagesState {
  images: string[];
}

const initialState: SelectedImagesState = {
  images: []
};

export const selectedImagesSlice = createSlice({
  name: 'selectedImages',
  initialState,
  reducers: {
    toggleSelectedImage: (state, action: PayloadAction<string>) => {
      const index = state.images.indexOf(action.payload);
      if (index === -1) {
        state.images.push(action.payload);
      } else {
        state.images.splice(index, 1);
      }
    },
    clearSelectedImages: (state) => {
      state.images = [];
    }
  }
});

export const { toggleSelectedImage, clearSelectedImages } = selectedImagesSlice.actions;
export const selectSelectedImages = (state: RootState) => state.selectedImages.images;
export default selectedImagesSlice.reducer;