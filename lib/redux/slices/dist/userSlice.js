"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
exports.selectUser = exports.clearUser = exports.setUser = exports.userSlice = void 0;
// lib/redux/slices/userSlice.ts
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    id: null,
    email: null,
    name: null,
    isVerified: false
};
exports.userSlice = toolkit_1.createSlice({
    name: 'user',
    initialState: (function () {
        // Check if window exists (client-side)
        if (typeof window !== 'undefined') {
            var savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : initialState;
        }
        return initialState;
    })(),
    reducers: {
        setUser: function (state, action) {
            var newState = __assign(__assign({}, state), action.payload);
            // Save to localStorage when updating
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(newState));
            }
            return newState;
        },
        clearUser: function () {
            // Clear localStorage when logging out
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
            return initialState;
        }
    }
});
exports.setUser = (_a = exports.userSlice.actions, _a.setUser), exports.clearUser = _a.clearUser;
exports.selectUser = function (state) { return state.user; };
exports["default"] = exports.userSlice.reducer;
