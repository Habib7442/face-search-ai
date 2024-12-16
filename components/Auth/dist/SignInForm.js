"use client";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SignInForm = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var navigation_1 = require("next/navigation");
var framer_motion_1 = require("framer-motion");
var sonner_1 = require("sonner");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var card_1 = require("@/components/ui/card");
var SocialAuth_1 = require("./SocialAuth");
var userSlice_1 = require("@/lib/redux/slices/userSlice");
var lucide_react_1 = require("lucide-react");
function SignInForm() {
    var _this = this;
    var _a = react_1.useState({ email: "", password: "" }), form = _a[0], setForm = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var dispatch = react_redux_1.useDispatch();
    var router = navigation_1.useRouter();
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setForm(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, cookies, tokenCookie, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(form),
                            credentials: 'include'
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.message || "Login failed");
                    }
                    // Store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(data.user));
                    cookies = document.cookie.split(';');
                    tokenCookie = cookies.find(function (cookie) { return cookie.trim().startsWith('client_token='); });
                    if (!tokenCookie) {
                        throw new Error("Authentication failed: No token received");
                    }
                    // Dispatch user data to Redux
                    dispatch(userSlice_1.setUser({
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.name,
                        isVerified: data.user.isVerified
                    }));
                    sonner_1.toast.success("Login successful!");
                    router.push("/upload");
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    localStorage.removeItem('user');
                    dispatch(userSlice_1.clearUser());
                    sonner_1.toast.error(error_1.message || "An error occurred during login");
                    console.error(error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var formFields = [
        {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "name@example.com",
            icon: (React.createElement("svg", { className: "w-5 h-5 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                React.createElement("path", { d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" })))
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            icon: (React.createElement("svg", { className: "w-5 h-5 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                React.createElement("path", { d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" })))
        }
    ];
    return (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "w-full max-w-lg mx-auto" },
        React.createElement(card_1.Card, { className: "border-none shadow-none bg-transparent" },
            React.createElement(card_1.CardHeader, { className: "space-y-1" },
                React.createElement(card_1.CardTitle, { className: "text-3xl font-bold text-center text-primary" }, "Welcome Back"),
                React.createElement("p", { className: "text-center text-gray-500 mt-2" }, "Sign in to continue your journey")),
            React.createElement(card_1.CardContent, { className: "space-y-8 mt-4" },
                React.createElement(SocialAuth_1.SocialAuth, null),
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { className: "absolute inset-0 flex items-center" },
                        React.createElement("div", { className: "w-full border-t border-gray-200" }))),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                    formFields.map(function (field) { return (React.createElement("div", { key: field.name, className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: field.name, className: "text-sm font-medium text-gray-700" }, field.label),
                        React.createElement("div", { className: "relative" },
                            React.createElement("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, field.icon),
                            React.createElement(input_1.Input, { id: field.name, name: field.name, type: field.type, placeholder: field.placeholder, className: "pl-10 h-11 border-gray-200 text-blue-600 focus:border-blue-500 focus:ring-blue-500 rounded-lg", value: form[field.name], onChange: handleInputChange, required: true })))); }),
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("div", { className: "flex items-center" },
                            React.createElement("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }),
                            React.createElement("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-700" }, "Remember me")),
                        React.createElement(button_1.Button, { type: "button", variant: "link", className: "text-sm font-medium text-blue-600 hover:text-blue-500" }, "Forgot password?")),
                    React.createElement(button_1.Button, { type: "submit", className: "w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200", disabled: loading }, loading ? (React.createElement("div", { className: "flex items-center justify-center" },
                        React.createElement(lucide_react_1.Loader2, { className: "w-5 h-5 animate-spin mr-2" }),
                        "Signing In...")) : ("Sign In")))))));
}
exports.SignInForm = SignInForm;
