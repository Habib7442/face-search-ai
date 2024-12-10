// lib/redux/slices/searchResultsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SearchResult } from "@/types/search";
import type { RootState } from "../store";

interface SearchResultsState {
  results: SearchResult[];
  uploadedImage: null;
}

const initialState: SearchResultsState = {
  results: [],
  uploadedImage: null,
};

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
    clearSearchResults: (state) => {
      state.results = [];
    },
    setUploadedImage: (state, action) => {
      state.uploadedImage = action.payload;
    },
  },
});

export const { setSearchResults, clearSearchResults } =
  searchResultsSlice.actions;

// Update the selector to handle the state shape correctly
export const selectSearchResults = (state: RootState) =>
  state.searchResults.results;

export default searchResultsSlice.reducer;
