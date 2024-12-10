"use strict";
exports.__esModule = true;
exports.store = void 0;
// lib/redux/store.ts
var toolkit_1 = require("@reduxjs/toolkit");
var rootReducer_1 = require("./rootReducer");
exports.store = toolkit_1.configureStore({
    reducer: rootReducer_1.rootReducer
});
