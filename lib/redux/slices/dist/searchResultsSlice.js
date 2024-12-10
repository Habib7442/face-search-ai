"use strict";
var _a;
exports.__esModule = true;
exports.selectSearchResults = exports.clearSearchResults = exports.setSearchResults = exports.searchResultsSlice = void 0;
// lib/redux/slices/searchResultsSlice.ts
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    results: [],
    uploadedImage: null
};
exports.searchResultsSlice = toolkit_1.createSlice({
    name: "searchResults",
    initialState: initialState,
    reducers: {
        setSearchResults: function (state, action) {
            state.results = action.payload;
        },
        clearSearchResults: function (state) {
            state.results = [];
        },
        setUploadedImage: function (state, action) {
            state.uploadedImage = action.payload;
        }
    }
});
exports.setSearchResults = (_a = exports.searchResultsSlice.actions, _a.setSearchResults), exports.clearSearchResults = _a.clearSearchResults;
// Update the selector to handle the state shape correctly
exports.selectSearchResults = function (state) {
    return state.searchResults.results;
};
exports["default"] = exports.searchResultsSlice.reducer;
