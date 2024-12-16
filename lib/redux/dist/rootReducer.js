"use strict";
exports.__esModule = true;
exports.rootReducer = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var adultFilterSlice_1 = require("./slices/adultFilterSlice");
var searchResultsSlice_1 = require("./slices/searchResultsSlice");
var uploadedImageSlice_1 = require("./slices/uploadedImageSlice");
var userSlice_1 = require("./slices/userSlice");
var selectedImagesSlice_1 = require("./slices/selectedImagesSlice");
exports.rootReducer = toolkit_1.combineReducers({
    adultFilter: adultFilterSlice_1["default"],
    searchResults: searchResultsSlice_1["default"],
    uploadedImage: uploadedImageSlice_1["default"],
    user: userSlice_1["default"],
    selectedImages: selectedImagesSlice_1["default"] // Add this line
});
