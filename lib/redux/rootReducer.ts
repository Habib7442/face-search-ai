import { combineReducers } from "@reduxjs/toolkit";
import adultFilterReducer from "./slices/adultFilterSlice";
import searchResultsReducer from "./slices/searchResultsSlice";
import uploadedImageReducer from "./slices/uploadedImageSlice";
import userReducer from "./slices/userSlice";

export const rootReducer = combineReducers({
  adultFilter: adultFilterReducer,
  searchResults: searchResultsReducer,
  uploadedImage: uploadedImageReducer,
  user: userReducer, 
});

// This is important for TypeScript
export type RootState = ReturnType<typeof rootReducer>;
