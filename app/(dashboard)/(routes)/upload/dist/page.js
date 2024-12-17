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
var badge_1 = require("@/components/ui/badge");
var switch_1 = require("@/components/ui/switch");
var selectedImagesSlice_1 = require("@/lib/redux/slices/selectedImagesSlice");
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
    var selectedImages = redux_1.useAppSelector(selectedImagesSlice_1.selectSelectedImages);
    var handleImageUpload = function (file, filterEnabled) { return __awaiter(_this, void 0, void 0, function () {
        var cookies, tokenCookie, accessToken, base64Image, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    setIsLoading(true);
                    setIsSearchCompleted(false);
                    cookies = document.cookie.split(";");
                    tokenCookie = cookies.find(function (cookie) {
                        return cookie.trim().startsWith("client_token=");
                    });
                    accessToken = tokenCookie ? tokenCookie.split("=")[1].trim() : null;
                    if (!accessToken) {
                        sonner_1.toast.error("Please login to search images");
                        router.push("/sign-in");
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
                    base64Image = _a.sent();
                    return [4 /*yield*/, fetch("/api/search", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + accessToken
                            },
                            body: JSON.stringify({
                                image: base64Image.split(",")[1],
                                adultFilter: filterEnabled
                            })
                        })];
                case 2:
                    response = _a.sent();
                    if (response.status === 401) {
                        sonner_1.toast.error("Session expired. Please login again");
                        router.push("/sign-in");
                        return [2 /*return*/];
                    }
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.results && Array.isArray(data.results)) {
                        dispatch(searchResultsSlice_1.setSearchResults(data.results));
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
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
    react_1.useEffect(function () {
        if (selectedImage && isSearchCompleted) {
            handleImageUpload(selectedImage, adultContentFilter);
        }
    }, [adultContentFilter]);
    // Handle image selection from search results
    var handleSelectResult = react_1.useCallback(function (imageUrl, sourceUrl) {
        setResultImage(imageUrl);
        setImageSourceUrl(sourceUrl);
    }, []);
    // Navigate to info page
    var handleMoreInfoClick = function () {
        router.push("/info");
    };
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-[#dfeeff] to-white py-8 px-4 md:py-12 md:px-8" },
        React.createElement("div", { className: "max-w-7xl mx-auto space-y-8 mt-4 lg:mt-0" },
            React.createElement(GlassCard_1.GlassCard, { className: "lg:p-8 md:p-6 p-6 bg-white/80 backdrop-blur-lg" },
                React.createElement("div", { className: "flex flex-col lg:flex-row items-center gap-6 mb-12" },
                    React.createElement("div", { className: "p-4 rounded-full bg-[#007BFF]/10" },
                        React.createElement(lucide_react_1.ImageIcon, { className: "h-8 w-8 text-[#007BFF]" })),
                    React.createElement("div", { className: "space-y-2 text-center lg:text-left" },
                        React.createElement(framer_motion_1.motion.h1, { className: "text-4xl md:text-5xl font-bold text-primary", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } }, "Image Search & Analysis"),
                        React.createElement("p", { className: "text-gray-600" }, "Upload an image to start searching"))),
                React.createElement("div", { className: "relative" },
                    React.createElement(DropZone_1.DropZone, { onDrop: function (file) {
                            setSelectedImage(file);
                            handleImageUpload(file, adultContentFilter);
                        }, dragActive: dragActive, setDragActive: setDragActive }),
                    React.createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, selectedImage && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, className: "mt-6 flex flex-col lg:flex-row md:flex-row xl:flex-row justify-center items-center gap-4" },
                        React.createElement(button_1.Button, { onClick: function () {
                                return selectedImage &&
                                    handleImageUpload(selectedImage, adultContentFilter);
                            }, disabled: isLoading, className: "bg-[#007BFF] hover:bg-[#66B2FF] text-white px-4 text-sm font-medium py-5 rounded-xl transition-all duration-200" }, isLoading ? (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.Loader2, { className: "h-5 w-5 animate-spin mr-2" }),
                            "Processing...")) : (React.createElement(React.Fragment, null,
                            React.createElement(lucide_react_1.Search, { className: "h-5 w-5 mr-2" }),
                            "Search Image"))),
                        React.createElement("div", { className: "flex items-center gap-3 bg-[#F0F4FA] px-4 py-3 rounded-xl " + (isSearchCompleted ? "" : "opacity-50") },
                            React.createElement("span", { className: "text-sm font-medium text-gray-700" }, "Adult Filter"),
                            React.createElement(switch_1.Switch, { checked: adultContentFilter, onCheckedChange: function () { return dispatch(adultFilterSlice_1.toggleAdultFilter()); }, disabled: !isSearchCompleted, className: "data-[state=checked]:bg-[#007BFF] data-[state=unchecked]:bg-[#007BFF]" })))))),
                React.createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, (selectedImage || uploadedImage) && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, className: "mt-8" },
                    React.createElement("div", { className: "relative rounded-xl overflow-hidden mx-auto w-full max-w-[400px] h-[400px]" },
                        React.createElement(badge_1.Badge, { className: "absolute top-4 left-4 bg-[#007BFF] text-white" }, "Uploaded Image"),
                        React.createElement(ImagePreview_1.ImagePreview, { src: selectedImage
                                ? URL.createObjectURL(selectedImage)
                                : uploadedImage || "", alt: "Uploaded preview", title: "Uploaded Image" })),
                    isLoading && (React.createElement("div", { className: "bg-white/80 rounded-xl shadow-lg p-8 flex items-center justify-center mt-4" },
                        React.createElement("div", { className: "flex flex-col items-center gap-4" },
                            React.createElement(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-[#007BFF]" }),
                            React.createElement("p", { className: "text-gray-600" }, "Analyzing image...")))))))),
            reduxSearchResults.length > 0 && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "space-y-8" },
                React.createElement("div", { className: "flex items-center justify-between" },
                    React.createElement("h2", { className: "text-3xl font-bold text-primary" }, "Deep Search Results"),
                    React.createElement("div", { className: "flex items-center gap-4" }, selectedImages.length > 0 && (React.createElement(badge_1.Badge, { variant: "secondary", className: "bg-[#F0F4FA] text-gray-700" },
                        selectedImages.length,
                        " images selected")))),
                React.createElement(SearchResult_1.SearchResults, { results: reduxSearchResults, onSelectResult: handleSelectResult }),
                React.createElement(button_1.Button, { onClick: handleMoreInfoClick, disabled: selectedImages.length === 0, className: " bg-accent  hover:bg-[#007BFF] text-white transition-all duration-200 disabled:opacity-50" },
                    React.createElement(lucide_react_1.Info, { className: "h-4 w-4 mr-2" }),
                    "Find More Info"))))));
}
exports["default"] = Upload;
