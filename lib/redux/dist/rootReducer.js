"use strict";
exports.__esModule = true;
exports.rootReducer = void 0;
// lib/redux/rootReducer.ts
var toolkit_1 = require("@reduxjs/toolkit");
var adultFilterSlice_1 = require("./slices/adultFilterSlice");
var searchResultsSlice_1 = require("./slices/searchResultsSlice");
var uploadedImageSlice_1 = require("./slices/uploadedImageSlice");
exports.rootReducer = toolkit_1.combineReducers({
    adultFilter: adultFilterSlice_1["default"],
    searchResults: searchResultsSlice_1["default"],
    uploadedImage: uploadedImageSlice_1["default"]
});
