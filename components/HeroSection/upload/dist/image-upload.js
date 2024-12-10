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
var ImageUpload = function (_a) {
    var open = _a.open, onClose = _a.onClose;
    //   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    var _b = react_1.useState(0), progress = _b[0], setProgress = _b[1];
    var _c = react_1.useState(false), isUploading = _c[0], setIsUploading = _c[1];
    var router = navigation_1.useRouter();
    var dispatch = react_redux_1.useDispatch();
    var uploadedImage = redux_1.useAppSelector(function (state) { return state.uploadedImage.image; });
    var handleImageUpload = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var file, reader_1;
        var _a;
        return __generator(this, function (_b) {
            file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (!file)
                return [2 /*return*/];
            try {
                setIsUploading(true);
                reader_1 = new FileReader();
                reader_1.onload = function () {
                    uploadedImageSlice_1.setUploadedImage(reader_1.result);
                    simulateUploadProgress(file);
                };
                reader_1.readAsDataURL(file);
            }
            catch (error) {
                console.error('Error handling file:', error);
                sonner_1.toast.error('Failed to process image');
                setIsUploading(false);
            }
            return [2 /*return*/];
        });
    }); };
    var simulateUploadProgress = function (file) {
        setProgress(0);
        var interval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setProgress(function (prev) {
                    if (prev >= 100) {
                        clearInterval(interval);
                        handleSearchUpload(file);
                        return 100;
                    }
                    return prev + 2;
                });
                return [2 /*return*/];
            });
        }); }, 50);
    };
    var handleSearchUpload = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var base64Image, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
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
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                image: base64Image.split(",")[1],
                                adultFilter: false
                            })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.results && Array.isArray(data.results)) {
                        // Dispatch actions as plain objects
                        dispatch(searchResultsSlice_1.setSearchResults(data.results));
                        dispatch(uploadedImageSlice_1.setUploadedImage(base64Image));
                        // Close the dialog
                        onClose();
                        // Navigate to upload page
                        setTimeout(function () {
                            router.push('/upload');
                        }, 500);
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error uploading image:', error_1);
                    sonner_1.toast.error('Failed to process image');
                    return [3 /*break*/, 6];
                case 5:
                    setIsUploading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: onClose },
        React.createElement(dialog_1.DialogContent, { className: "max-w-4xl p-6 bg-gradient-to-b from-[#ccf4e6] to-white" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, { className: "text-2xl font-bold text-gray-800" }, "Upload Your Image")),
            React.createElement("div", { className: "mt-6 space-y-6" },
                React.createElement("label", { className: "cursor-pointer block" },
                    React.createElement("div", { className: "relative h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:border-blue-500 transition-colors" }, !uploadedImage ? (React.createElement("div", { className: "text-center p-4" },
                        React.createElement(lucide_react_1.ImageIcon, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }),
                        React.createElement("p", { className: "text-gray-500" },
                            "Drop your image here or",
                            " ",
                            React.createElement("span", { className: "text-blue-600 font-medium" }, "browse")),
                        React.createElement("p", { className: "text-sm text-gray-400 mt-1" }, "Supports JPG, PNG files"))) : (React.createElement(image_1["default"], { src: uploadedImage, alt: "Uploaded preview", layout: "fill", objectFit: "contain", className: "rounded-lg" }))),
                    React.createElement("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleImageUpload, disabled: isUploading })),
                uploadedImage && (React.createElement("div", { className: "space-y-4" },
                    React.createElement("div", { className: "w-full bg-gray-200 rounded-full h-2.5" },
                        React.createElement("div", { className: "bg-blue-600 h-2.5 rounded-full transition-all duration-300", style: { width: progress + "%" } })),
                    React.createElement("p", { className: "text-center text-gray-600" }, progress === 100 ? 'Processing search...' : "Uploading... " + progress + "%")))))));
};
exports["default"] = ImageUpload;
