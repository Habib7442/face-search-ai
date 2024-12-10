// lib/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import adultFilterReducer from "./slices/adultFilterSlice";
import searchResultsReducer from "./slices/searchResultsSlice";
import uploadedImageReducer from "./slices/uploadedImageSlice";

export const rootReducer = combineReducers({
  adultFilter: adultFilterReducer,
  searchResults: searchResultsReducer,
  uploadedImage: uploadedImageReducer,
});

// This is important for TypeScript
export type RootState = ReturnType<typeof rootReducer>;
