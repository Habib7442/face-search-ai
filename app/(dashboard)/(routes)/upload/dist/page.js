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
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var sonner_1 = require("sonner");
var react_redux_1 = require("react-redux");
var redux_1 = require("@/lib/redux");
var adultFilterSlice_1 = require("@/lib/redux/slices/adultFilterSlice");
var button_1 = require("@/components/ui/button");
var ImagePreview_1 = require("@/components/ImagePreview");
var navigation_1 = require("next/navigation");
var GlassCard_1 = require("@/components/GlassCard");
var DropZone_1 = require("@/components/DropZone");
var SearchResult_1 = require("@/components/SearchResult");
var searchResultsSlice_1 = require("@/lib/redux/slices/searchResultsSlice");
// import { clearUploadedImage } from "@/lib/redux/slices/uploadedImageSlice";
function Upload() {
    var _this = this;
    var _a = react_1.useState(null), selectedImage = _a[0], setSelectedImage = _a[1];
    var _b = react_1.useState(null), resultImage = _b[0], setResultImage = _b[1];
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = react_1.useState(false), dragActive = _d[0], setDragActive = _d[1];
    var _e = react_1.useState(null), imageSourceUrl = _e[0], setImageSourceUrl = _e[1];
    // const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    var _f = react_1.useState(false), isSearchCompleted = _f[0], setIsSearchCompleted = _f[1];
    var router = navigation_1.useRouter();
    var dispatch = react_redux_1.useDispatch();
    var adultContentFilter = redux_1.useAppSelector(adultFilterSlice_1.selectAdultFilter);
    var reduxSearchResults = redux_1.useAppSelector(searchResultsSlice_1.selectSearchResults);
    var uploadedImage = redux_1.useAppSelector(function (state) { return state.uploadedImage.image; });
    var handleImageUpload = function (file, filterEnabled) { return __awaiter(_this, void 0, void 0, function () {
        var cookies, tokenCookie, accessToken, base64Image, response, data, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, 5, 6]);
                    setIsLoading(true);
                    setIsSearchCompleted(false);
                    cookies = document.cookie.split(';');
                    tokenCookie = cookies.find(function (cookie) { return cookie.trim().startsWith('client_token='); });
                    accessToken = tokenCookie ? tokenCookie.split('=')[1].trim() : null;
                    console.log(accessToken);
                    if (!accessToken) {
                        sonner_1.toast.error("Please login to search images");
                        router.push('/auth');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = function () {
                                resolve(reader.result);
                            };
                        })];
                case 1:
                    base64Image = _c.sent();
                    return [4 /*yield*/, fetch("/api/search", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + accessToken
                            },
                            body: JSON.stringify({
                                image: base64Image.split(",")[1],
                                adultFilter: filterEnabled
                            })
                        })];
                case 2:
                    response = _c.sent();
                    if (response.status === 401) {
                        sonner_1.toast.error("Session expired. Please login again");
                        router.push('/auth');
                        return [2 /*return*/];
                    }
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _c.sent();
                    if (data.results && Array.isArray(data.results)) {
                        setResultImage(((_a = data.results[0]) === null || _a === void 0 ? void 0 : _a.imageUrl) || null);
                        setImageSourceUrl(((_b = data.results[0]) === null || _b === void 0 ? void 0 : _b.sourceUrl) || null);
                        dispatch(searchResultsSlice_1.setSearchResults(data.results));
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _c.sent();
                    console.error("Error processing image:", error_1);
                    sonner_1.toast.error("Failed to process image");
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    setIsSearchCompleted(true);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Handle image selection from search results
    var handleSelectResult = react_1.useCallback(function (imageUrl, sourceUrl) {
        setResultImage(imageUrl);
        setImageSourceUrl(sourceUrl);
    }, []);
    // Navigate to info page
    var handleMoreInfoClick = function () {
        router.push("/info");
    };
    return (React.createElement("div", { className: "min-h-screen text-slate-200 py-8 px-4 md:py-12 md:px-8" },
        React.createElement("div", { className: "max-w-7xl mx-auto space-y-8 mt-4 lg:mt-0" },
            React.createElement(GlassCard_1.GlassCard, { className: "lg:p-8 md:p-6 p-1" },
                React.createElement("div", { className: "flex flex-col lg:flex-row items-center gap-6 mb-8" },
                    React.createElement("div", { className: "p-3 rounded-full bg-primary/10" },
                        React.createElement(lucide_react_1.ImageIcon, { className: "h-8 w-8 text-teal-800 drop-shadow-md" })),
                    React.createElement(framer_motion_1.motion.h1, { className: "poppins-semibold text-center text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-slate-900", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } }, "Image Search & Analysis")),
                React.createElement(DropZone_1.DropZone, { onDrop: function (file) {
                        setSelectedImage(file);
                        handleImageUpload(file, adultContentFilter);
                    }, dragActive: dragActive, setDragActive: setDragActive }),
                React.createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, selectedImage && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, className: "mt-6 flex flex-col lg:flex-row md:flex-row xl:flex-row justify-center items-center gap-4" },
                    React.createElement(button_1.Button, { onClick: function () {
                            return selectedImage &&
                                handleImageUpload(selectedImage, adultContentFilter);
                        }, disabled: isLoading, className: "bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-xl text-lg transition-colors" },
                        isLoading ? (React.createElement(lucide_react_1.Loader2, { className: "h-5 w-5 animate-spin mr-2" })) : (React.createElement(lucide_react_1.Search, { className: "h-5 w-5 mr-2" })),
                        isLoading ? "Processing..." : "Search Image"),
                    React.createElement("label", { className: "flex items-center gap-3 bg-amber-400/50 px-6 py-3 rounded-xl cursor-pointer " + (isSearchCompleted ? "" : "opacity-50 cursor-not-allowed") },
                        React.createElement("span", { className: "text-sm font-medium text-slate-900" }, "Adult Filter"),
                        React.createElement("input", { type: "checkbox", checked: adultContentFilter, onChange: function () { return dispatch(adultFilterSlice_1.toggleAdultFilter()); }, className: "w-5 h-5 rounded border-slate-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-slate-300", disabled: !isSearchCompleted }))))),
                React.createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, (selectedImage || resultImage || uploadedImage) && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, className: "grid md:grid-cols-2 gap-8 mt-8" },
                    (selectedImage || uploadedImage) && (React.createElement(ImagePreview_1.ImagePreview
                    // If uploadedImage is a base64 string, use it directly
                    // If selectedImage is a File, use URL.createObjectURL
                    , { 
                        // If uploadedImage is a base64 string, use it directly
                        // If selectedImage is a File, use URL.createObjectURL
                        src: selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : uploadedImage || "", alt: "Uploaded preview", title: "Uploaded Image" })),
                    isLoading ? (React.createElement(GlassCard_1.GlassCard, { className: "p-6 flex items-center justify-center" },
                        React.createElement(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-purple-500" }))) : (resultImage && (React.createElement(ImagePreview_1.ImagePreview, { src: resultImage, alt: "Result preview", title: "Selected Result", sourceUrl: imageSourceUrl || undefined }))))))),
            reduxSearchResults.length > 0 && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "space-y-6" },
                React.createElement("div", { className: "flex items-center justify-between" },
                    React.createElement("h2", { className: "poppins-semibold text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-slate-900" }, "Deep Search Results")),
                React.createElement(SearchResult_1.SearchResults, { results: reduxSearchResults, onSelectResult: handleSelectResult }),
                React.createElement("div", { className: "w-full flex justify-center items-center" },
                    React.createElement(button_1.Button, { onClick: handleMoreInfoClick, className: "bg-teal-800 hover:bg-slate-700 text-white" },
                        React.createElement(lucide_react_1.Info, { className: "h-4 w-4 mr-2" }),
                        "Find More Info")))))));
}
exports["default"] = Upload;
