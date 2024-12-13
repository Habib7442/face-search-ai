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
var dialog_1 = require("@/components/ui/dialog");
var lucide_react_1 = require("lucide-react");
var navigation_1 = require("next/navigation");
var image_1 = require("next/image");
var sonner_1 = require("sonner");
var react_redux_1 = require("react-redux");
var searchResultsSlice_1 = require("@/lib/redux/slices/searchResultsSlice");
var uploadedImageSlice_1 = require("@/lib/redux/slices/uploadedImageSlice");
var redux_1 = require("@/lib/redux");
var scanning_animation_1 = require("./scanning-animation");
var progress_indicator_1 = require("./progress-indicator");
var ImageUpload = function (_a) {
    var open = _a.open, onClose = _a.onClose;
    var _b = react_1.useState(0), progress = _b[0], setProgress = _b[1];
    var _c = react_1.useState(false), isUploading = _c[0], setIsUploading = _c[1];
    var router = navigation_1.useRouter();
    var dispatch = react_redux_1.useDispatch();
    var uploadedImage = redux_1.useAppSelector(function (state) { return state.uploadedImage.image; });
    react_1.useEffect(function () {
        if (uploadedImage && open) {
            // Automatically start upload process when image is set
            simulateUploadProgress();
        }
    }, [uploadedImage, open]);
    var simulateUploadProgress = function () {
        setIsUploading(true);
        setProgress(0);
        var interval = setInterval(function () {
            setProgress(function (prev) {
                if (prev >= 100) {
                    clearInterval(interval);
                    handleSearchUpload();
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };
    var handleSearchUpload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var cookies, tokenCookie, accessToken, base64Image, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    cookies = document.cookie.split(';');
                    tokenCookie = cookies.find(function (cookie) { return cookie.trim().startsWith('client_token='); });
                    accessToken = tokenCookie ? tokenCookie.split('=')[1].trim() : null;
                    if (!accessToken) {
                        sonner_1.toast.error("Please login to search images");
                        onClose();
                        router.push('/auth');
                        return [2 /*return*/];
                    }
                    base64Image = uploadedImage.split(",")[1];
                    return [4 /*yield*/, fetch("/api/search", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + accessToken
                            },
                            body: JSON.stringify({
                                image: base64Image,
                                adultFilter: false
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 401) {
                        sonner_1.toast.error("Session expired. Please login again");
                        onClose();
                        router.push('/login');
                        return [2 /*return*/];
                    }
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.results && Array.isArray(data.results)) {
                        dispatch(searchResultsSlice_1.setSearchResults(data.results));
                        dispatch(uploadedImageSlice_1.setUploadedImage(uploadedImage));
                        onClose();
                        setTimeout(function () {
                            router.push("/upload");
                        }, 500);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error uploading image:", error_1);
                    sonner_1.toast.error("Failed to process image");
                    return [3 /*break*/, 5];
                case 4:
                    setIsUploading(false);
                    setProgress(0);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: onClose },
        React.createElement(dialog_1.DialogContent, { className: "max-w-4xl p-6 bg-gradient-to-b from-[#ccf4e6] to-white" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, { className: "text-2xl font-bold text-gray-800" }, "Upload Your Image")),
            React.createElement("div", { className: "mt-6 space-y-6 relative" },
                React.createElement("div", { className: "relative h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:border-blue-500 transition-colors" }, !uploadedImage ? (React.createElement("div", { className: "text-center p-4" },
                    React.createElement(lucide_react_1.ImageIcon, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }),
                    React.createElement("p", { className: "text-gray-500" }, "No image uploaded"))) : (React.createElement("div", { className: "relative h-full w-full" },
                    React.createElement(image_1["default"], { src: uploadedImage, alt: "Uploaded preview", layout: "fill", objectFit: "contain", className: "rounded-lg" }),
                    isUploading && React.createElement(scanning_animation_1.ScanningAnimation, null)))),
                uploadedImage && React.createElement(progress_indicator_1.ProgressIndicator, { progress: progress })))));
};
exports["default"] = ImageUpload;
