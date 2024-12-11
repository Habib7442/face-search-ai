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
exports.clearUser = exports.setUser = exports.userSlice = void 0;
// In userSlice.ts
var toolkit_1 = require("@reduxjs/toolkit");
exports.userSlice = toolkit_1.createSlice({
    name: 'user',
    initialState: {
        id: null,
        email: null,
        name: null,
        isVerified: false
    },
    reducers: {
        setUser: function (state, action) {
            return __assign(__assign({}, state), action.payload);
        },
        clearUser: function () { return ({
            id: null,
            email: null,
            name: null,
            isVerified: false
        }); }
    }
});
exports.setUser = (_a = exports.userSlice.actions, _a.setUser), exports.clearUser = _a.clearUser;
exports["default"] = exports.userSlice.reducer;
