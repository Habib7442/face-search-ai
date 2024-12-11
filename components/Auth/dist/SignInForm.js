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
        var response, data, error_1;
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
                            body: JSON.stringify(form)
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.message || "Login failed");
                    }
                    // Dispatch user data to Redux
                    dispatch(userSlice_1.setUser(data.user));
                    // Show success toast
                    sonner_1.toast.success("Login successful!");
                    // Redirect to upload page
                    router.push("/upload");
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
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
    return (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "w-full max-w-lg mx-auto" },
        React.createElement(card_1.Card, { className: "border-none shadow-none" },
            React.createElement(card_1.CardHeader, { className: "space-y-1" },
                React.createElement(card_1.CardTitle, { className: "text-3xl font-bold text-center text-green-600" }, "Login to Your Account"),
                React.createElement(card_1.CardDescription, { className: "text-center" }, "Enter your email and password to access your account")),
            React.createElement(card_1.CardContent, { className: "space-y-6" },
                React.createElement(SocialAuth_1.SocialAuth, null),
                React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement("div", { className: "space-y-4" },
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement(label_1.Label, { htmlFor: "email" }, "Email"),
                            React.createElement(input_1.Input, { id: "email", name: "email", type: "email", placeholder: "name@example.com", className: "h-11", value: form.email, onChange: handleInputChange, required: true })),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("div", { className: "flex items-center justify-between" },
                                React.createElement(label_1.Label, { htmlFor: "password" }, "Password"),
                                React.createElement(button_1.Button, { type: "button", variant: "link", className: "px-0 font-semibold text-green-600" }, "Forgot password?")),
                            React.createElement(input_1.Input, { id: "password", name: "password", type: "password", placeholder: "Enter your password", className: "h-11", value: form.password, onChange: handleInputChange, required: true })),
                        React.createElement(button_1.Button, { type: "submit", className: "h-11 w-full bg-green-600 hover:bg-green-700", disabled: loading }, loading ? "Signing In..." : "Sign In")))))));
}
exports.SignInForm = SignInForm;