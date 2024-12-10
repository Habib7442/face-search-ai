"use strict";
var _a;
exports.__esModule = true;
exports.clearUploadedImage = exports.setUploadedImage = exports.uploadedImageSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
// Initial state
var initialState = {
    image: null
};
// Create the slice
exports.uploadedImageSlice = toolkit_1.createSlice({
    name: 'uploadedImage',
    initialState: initialState,
    reducers: {
        // Action to set the uploaded image
        setUploadedImage: function (state, action) {
            state.image = action.payload;
        },
        // Optional: Clear the image
        clearUploadedImage: function (state) {
            state.image = null;
        }
    }
});
// Export the actions
exports.setUploadedImage = (_a = exports.uploadedImageSlice.actions, _a.setUploadedImage), exports.clearUploadedImage = _a.clearUploadedImage;
// Export the reducer
exports["default"] = exports.uploadedImageSlice.reducer;
