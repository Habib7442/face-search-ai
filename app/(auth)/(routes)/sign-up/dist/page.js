"use client";
"use strict";
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
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
function SignUp() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            setIsLoading(true);
            // Add your sign-up logic here
            setIsLoading(false);
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", { className: "min-h-screen flex items-center justify-center px-4" },
        React.createElement("div", { className: "absolute inset-0 -z-10" },
            React.createElement("div", { className: "absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" }),
            React.createElement("div", { className: "absolute top-0 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" }),
            React.createElement("div", { className: "absolute bottom-32 left-1/3 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" })),
        React.createElement("div", { className: "max-w-md w-full" },
            React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 relative overflow-hidden" },
                React.createElement("div", { className: "text-center mb-8" },
                    React.createElement("h2", { className: "text-2xl font-bold text-slate-900" }, "Create Account"),
                    React.createElement("p", { className: "text-slate-600 mt-2" }, "Join our community today")),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                    React.createElement("div", { className: "space-y-4" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Full Name"),
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" }),
                                React.createElement("input", { type: "text", required: true, className: "w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white/50", placeholder: "Enter your full name" }))),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Email"),
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" }),
                                React.createElement("input", { type: "email", required: true, className: "w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white/50", placeholder: "Enter your email" }))),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-sm font-medium text-slate-700 mb-1" }, "Password"),
                            React.createElement("div", { className: "relative" },
                                React.createElement(lucide_react_1.Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" }),
                                React.createElement("input", { type: "password", required: true, className: "w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white/50", placeholder: "Create a password" })))),
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("input", { type: "checkbox", required: true, className: "rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" }),
                        React.createElement("span", { className: "ml-2 text-sm text-slate-600" },
                            "I agree to the",
                            " ",
                            React.createElement(link_1["default"], { href: "/terms", className: "text-indigo-600 hover:text-indigo-700" }, "Terms of Service"),
                            " ",
                            "and",
                            " ",
                            React.createElement(link_1["default"], { href: "/privacy", className: "text-indigo-600 hover:text-indigo-700" }, "Privacy Policy"))),
                    React.createElement(framer_motion_1.motion.button, { whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, type: "submit", disabled: isLoading, className: "w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2" },
                        isLoading ? "Creating account..." : "Create Account",
                        React.createElement(lucide_react_1.ArrowRight, { className: "h-4 w-4" }))),
                React.createElement("div", { className: "mt-6 text-center" },
                    React.createElement("p", { className: "text-sm text-slate-600" },
                        "Already have an account?",
                        " ",
                        React.createElement(link_1["default"], { href: "/sign-in", className: "text-indigo-600 hover:text-indigo-700 font-medium" }, "Sign in")))))));
}
exports["default"] = SignUp;
