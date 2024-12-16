"use strict";
var _a;
exports.__esModule = true;
exports.selectSelectedImages = exports.clearSelectedImages = exports.toggleSelectedImage = exports.selectedImagesSlice = void 0;
// lib/redux/slices/selectedImagesSlice.ts
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    images: []
};
exports.selectedImagesSlice = toolkit_1.createSlice({
    name: 'selectedImages',
    initialState: initialState,
    reducers: {
        toggleSelectedImage: function (state, action) {
            var index = state.images.indexOf(action.payload);
            if (index === -1) {
                state.images.push(action.payload);
            }
            else {
                state.images.splice(index, 1);
            }
        },
        clearSelectedImages: function (state) {
            state.images = [];
        }
    }
});
exports.toggleSelectedImage = (_a = exports.selectedImagesSlice.actions, _a.toggleSelectedImage), exports.clearSelectedImages = _a.clearSelectedImages;
exports.selectSelectedImages = function (state) { return state.selectedImages.images; };
exports["default"] = exports.selectedImagesSlice.reducer;
