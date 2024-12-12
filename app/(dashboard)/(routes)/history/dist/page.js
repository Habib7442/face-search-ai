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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var HistoryCard_1 = require("@/components/HistoryCard");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var sonner_1 = require("sonner");
var navigation_1 = require("next/navigation");
function HistoryPage() {
    var _this = this;
    var _a = react_1.useState(null), history = _a[0], setHistory = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        var fetchHistory = function () { return __awaiter(_this, void 0, void 0, function () {
            var cookies, tokenCookie, accessToken, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        cookies = document.cookie.split(";");
                        tokenCookie = cookies.find(function (cookie) {
                            return cookie.trim().startsWith("client_token=");
                        });
                        accessToken = tokenCookie
                            ? tokenCookie.split("=")[1].trim()
                            : null;
                        if (!accessToken) {
                            sonner_1.toast.error("Please login to view history");
                            router.push("/login");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fetch("/api/history?email=premium@example.com", {
                                headers: {
                                    Authorization: "Bearer " + accessToken
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 401) {
                            sonner_1.toast.error("Session expired. Please login again");
                            router.push("/login");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (!response.ok) {
                            throw new Error(data.message || "Failed to fetch history");
                        }
                        setHistory(data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        sonner_1.toast.error(error_1 instanceof Error ? error_1.message : "Failed to fetch history");
                        if (error_1.message === "Premium access required") {
                            // Handle premium access error specifically
                            sonner_1.toast.error("This feature requires premium access");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchHistory();
    }, [router]);
    // Check for token on mount
    react_1.useEffect(function () {
        var cookies = document.cookie.split(";");
        var tokenCookie = cookies.find(function (cookie) {
            return cookie.trim().startsWith("client_token=");
        });
        if (!tokenCookie) {
            sonner_1.toast.error("Please login to view history");
            router.push("/login");
        }
    }, [router]);
    return (React.createElement("main", { className: "min-h-screen  text-black" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" },
            React.createElement(link_1["default"], { href: "/" },
                React.createElement(button_1.Button, { variant: "outline", className: "mb-8 text-gray-300 hover:text-white" },
                    React.createElement(lucide_react_1.ArrowLeft, { className: "mr-2 h-4 w-4" }),
                    " Back to Home")),
            React.createElement("div", { className: "mb-12" },
                React.createElement("div", { className: "flex items-center gap-4 mb-4" },
                    React.createElement("div", { className: "p-3 rounded-full bg-primary/10 text-gray-800" },
                        React.createElement(lucide_react_1.History, { className: "h-6 w-6 text-gray-800 drop-shadow-md" })),
                    React.createElement("h1", { className: "poppins-semibold text-3xl font-bold text-gray-800" }, "Search History")),
                React.createElement("p", { className: "text-black" }, "View your previous search results and findings")),
            loading ? (React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, __spreadArrays(Array(6)).map(function (_, i) { return (React.createElement("div", { key: i, className: "animate-pulse bg-gray-800 rounded-lg aspect-video" })); }))) : history ? (React.createElement("div", { className: "space-y-8" },
                React.createElement("div", { className: "flex items-center justify-between" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm text-gray-400" }, "Search ID"),
                        React.createElement("p", { className: "font-mono text-sm" }, history.id)),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm text-gray-400" }, "Time"),
                        React.createElement("p", { className: "font-mono text-sm" }, history.timestamp))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, history.search_results.map(function (result, index) { return (React.createElement(HistoryCard_1.HistoryCard, { key: index, result: result })); })),
                React.createElement("div", { className: "flex justify-between items-center text-sm text-gray-400" },
                    React.createElement("p", null,
                        "Platform: ",
                        history.platform),
                    React.createElement("p", null,
                        "Total Results: ",
                        history.result_count)))) : (React.createElement("div", { className: "text-center py-12" },
                React.createElement("p", { className: "text-gray-400" }, "No history available"))))));
}
exports["default"] = HistoryPage;
