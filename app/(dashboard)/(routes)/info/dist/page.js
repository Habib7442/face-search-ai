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
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var GlassCard_1 = require("@/components/GlassCard");
var link_1 = require("next/link");
var bento_grid_1 = require("@/components/ui/bento-grid");
var redux_1 = require("@/lib/redux");
var searchResultsSlice_1 = require("@/lib/redux/slices/searchResultsSlice");
function InfoPage() {
    var _this = this;
    var _a = react_1.useState([]), selectedImages = _a[0], setSelectedImages = _a[1];
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(null), gptResult = _c[0], setGPTResult = _c[1];
    var _d = react_1.useState([]), apiSearchResults = _d[0], setApiSearchResults = _d[1];
    var searchResults = redux_1.useAppSelector(searchResultsSlice_1.selectSearchResults);
    // Remove the localStorage effect since we're using Redux
    // The searchResults will be available directly from the Redux store
    var handleImageSelect = function (imageUrl) {
        setSelectedImages(function (prev) {
            if (prev.includes(imageUrl)) {
                return prev.filter(function (url) { return url !== imageUrl; });
            }
            return __spreadArrays(prev, [imageUrl]);
        });
    };
    var handleAnalyze = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (selectedImages.length === 0)
                        return [2 /*return*/];
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/get-info", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ imageUrls: selectedImages })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch info");
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    setGPTResult(data.result);
                    setApiSearchResults(data.search_results);
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error analyzing images:", error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // If there are no search results, show a message and link back to upload
    if (!searchResults.length) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center text-slate-200 py-8 px-4" },
            React.createElement(GlassCard_1.GlassCard, { className: "p-8 text-center" },
                React.createElement("h2", { className: "text-2xl font-bold mb-4" }, "No Search Results Available"),
                React.createElement("p", { className: "mb-6" }, "Please perform a search first to see results."),
                React.createElement(link_1["default"], { href: "/upload" },
                    React.createElement(button_1.Button, { className: "bg-purple-600 hover:bg-purple-700 text-white" }, "Go to Search")))));
    }
    return (React.createElement("div", { className: "min-h-screen  text-slate-200 py-8 px-4 md:py-12 md:px-8" },
        React.createElement("div", { className: "max-w-7xl mx-auto" },
            React.createElement("div", { className: "flex items-center gap-4 mb-8" },
                React.createElement(link_1["default"], { href: "/upload" },
                    React.createElement(button_1.Button, { variant: "ghost", size: "icon", className: "hover:bg-slate-800/50 bg-slate-900" },
                        React.createElement(lucide_react_1.ArrowLeft, { className: "h-5 w-5" }))),
                React.createElement("h1", { className: "poppins-semibold text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-slate-900" }, "Deep Analysis")),
            React.createElement(GlassCard_1.GlassCard, { className: "p-8 mb-8" },
                React.createElement("div", { className: "flex justify-center mb-8" },
                    React.createElement(button_1.Button, { onClick: handleAnalyze, disabled: selectedImages.length === 0 || isLoading, className: "bg-purple-600 hover:bg-purple-700 text-white px-8 py-2" }, isLoading ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin mr-2" }),
                        "Analyzing Selected Images...")) : ("Analyze Selected Images"))),
                React.createElement("div", { className: "flex mb-8" },
                    React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4" }, searchResults.map(function (result, index) { return (React.createElement(framer_motion_1.motion.div, { key: index, className: "relative cursor-pointer rounded-lg overflow-hidden " + (selectedImages.includes(result.imageUrl)
                            ? "ring-2 ring-purple-500"
                            : ""), onClick: function () { return handleImageSelect(result.imageUrl); }, whileHover: { scale: 1.02 } },
                        React.createElement("img", { src: result.imageUrl, alt: "Result " + (index + 1), className: "w-full h-32 object-cover" }),
                        React.createElement("div", { className: "absolute inset-0 bg-purple-500/20 transition-opacity " + (selectedImages.includes(result.imageUrl)
                                ? "opacity-100"
                                : "opacity-0") }),
                        React.createElement("div", { className: "absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-white text-xs" },
                            "Source: ",
                            result.sourceUrl))); }))),
                apiSearchResults.length > 0 && (React.createElement("div", { className: "mb-8" },
                    React.createElement("h2", { className: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4" }, "Search Results"),
                    React.createElement(bento_grid_1.BentoGrid, null, apiSearchResults.map(function (result, index) { return (React.createElement(bento_grid_1.BentoGridItem, { key: index, header: React.createElement("img", { src: result.imageUrl, alt: "Search Result " + (index + 1), className: "w-full h-full object-cover" }), title: "Source: " + result.sourceUrl, description: "Group: " + result.group })); })))),
                gptResult && (React.createElement("div", { className: "space-y-6 bg-white p-6 rounded-lg shadow-md" },
                    React.createElement("h2", { className: "text-2xl font-bold text-gray-800" }, "Analysis Results"),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-xl font-semibold text-gray-700 mb-2" }, "Full Name"),
                        React.createElement("p", { className: "text-gray-600" }, gptResult["Full Name"])),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-xl font-semibold text-gray-700 mb-2" }, "Confidential Analysis Score"),
                        React.createElement("p", { className: "text-gray-600" }, gptResult["Confidential Analysis Score"])),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-xl font-semibold text-gray-700 mb-2" }, "Topics"),
                        React.createElement("ul", { className: "list-disc pl-5 text-gray-600" }, gptResult.Topics.map(function (topic, index) { return (React.createElement("li", { key: index }, topic)); }))),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-xl font-semibold text-gray-700 mb-2" }, "More Information"),
                        React.createElement("p", { className: "text-gray-600" }, gptResult["More Information"])),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-xl font-semibold text-gray-700 mb-2" }, "AI Generated Poem"),
                        React.createElement("pre", { className: "whitespace-pre-wrap text-gray-600 bg-gray-100 p-4 rounded-lg" }, gptResult["Poem"]))))))));
}
exports["default"] = InfoPage;
