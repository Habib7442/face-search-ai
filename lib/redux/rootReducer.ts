import { combineReducers } from "@reduxjs/toolkit";
import adultFilterReducer from "./slices/adultFilterSlice";
import searchResultsReducer from "./slices/searchResultsSlice";
import uploadedImageReducer from "./slices/uploadedImageSlice";
import userReducer from "./slices/userSlice";
import selectedImagesReducer from "./slices/selectedImagesSlice";

export const rootReducer = combineReducers({
  adultFilter: adultFilterReducer,
  searchResults: searchResultsReducer,
  uploadedImage: uploadedImageReducer,
  user: userReducer,
  selectedImages: selectedImagesReducer  // Add this line
});

export type RootState = ReturnType<typeof rootReducer>;