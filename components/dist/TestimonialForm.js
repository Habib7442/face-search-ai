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
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var hooks_1 = require("@/lib/redux/hooks");
var sonner_1 = require("sonner");
var card_1 = require("./ui/card");
var framer_motion_1 = require("framer-motion");
var supabase_1 = require("@/lib/supabase");
function TestimonialForm() {
    var _this = this;
    var user = hooks_1.useAppSelector(function (state) { return state.user; });
    var _a = react_1.useState(0), rating = _a[0], setRating = _a[1];
    var _b = react_1.useState(""), message = _b[0], setMessage = _b[1];
    var _c = react_1.useState(null), customImage = _c[0], setCustomImage = _c[1];
    var _d = react_1.useState(false), isSubmitting = _d[0], setIsSubmitting = _d[1];
    var handleImageUpload = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                sonner_1.toast.error("Image size should be less than 5MB");
                return;
            }
            // Validate file type
            if (!file.type.startsWith("image/")) {
                sonner_1.toast.error("Please upload an image file");
                return;
            }
            setCustomImage(file);
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var imageUrl, fileExt, fileName, _a, uploadData, uploadError, urlData, insertError, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!user.id || rating === 0) {
                        sonner_1.toast.error("Please login and provide a rating");
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, 6, 7]);
                    imageUrl = "";
                    if (!customImage) return [3 /*break*/, 3];
                    fileExt = customImage.name.split(".").pop();
                    fileName = user.id + "_" + Date.now() + "." + fileExt;
                    return [4 /*yield*/, supabase_1.supabase.storage
                            .from("testimonial-images")
                            .upload(fileName, customImage, {
                            cacheControl: "3600",
                            upsert: true
                        })];
                case 2:
                    _a = _b.sent(), uploadData = _a.data, uploadError = _a.error;
                    if (uploadError)
                        throw uploadError;
                    urlData = supabase_1.supabase.storage
                        .from("testimonial-images")
                        .getPublicUrl(fileName).data;
                    imageUrl = fileName; // Store just the filename
                    _b.label = 3;
                case 3: return [4 /*yield*/, supabase_1.supabase
                        .from("testimonials")
                        .insert({
                        user_id: user.id,
                        name: user.name || "Anonymous",
                        email: user.email,
                        rating: rating,
                        message: message,
                        user_image_url: imageUrl
                    })];
                case 4:
                    insertError = (_b.sent()).error;
                    if (insertError)
                        throw insertError;
                    // Reset form
                    setRating(0);
                    setMessage("");
                    setCustomImage(null);
                    sonner_1.toast.success("Thank you for your testimonial!");
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _b.sent();
                    console.error("Testimonial submission error:", error_1);
                    sonner_1.toast.error("Failed to submit testimonial. Please try again.");
                    return [3 /*break*/, 7];
                case 6:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var renderStars = function () {
        return [1, 2, 3, 4, 5].map(function (starValue) { return (React.createElement(lucide_react_1.Star, { key: starValue, onClick: function () { return setRating(starValue); }, className: "cursor-pointer transition-colors duration-200 " + (starValue <= rating
                ? "text-yellow-400 fill-current"
                : "text-neutral-600 hover:text-neutral-400"), size: 32 })); });
    };
    if (!user.id) {
        return (React.createElement("div", { className: "flex min-h-[400px] items-center justify-center" },
            React.createElement(card_1.Card, { className: "border-none shadow-none bg-transparent" },
                React.createElement(card_1.CardContent, { className: "p-8" },
                    React.createElement("p", { className: "text-center text-gray-500" }, "Please login to submit a testimonial.")))));
    }
    return (React.createElement("div", { className: "container mx-auto px-4 py-8" },
        React.createElement("div", { className: "w-full mx-auto" },
            React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "w-full max-w-lg mx-auto" },
                React.createElement(card_1.Card, { className: "border bg-transparent border-neutral" },
                    React.createElement(card_1.CardContent, { className: "space-y-6 mt-6 p-4" },
                        React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                            React.createElement("div", { className: "space-y-4" },
                                React.createElement("label", { className: "block text-sm font-medium text-gray-700" }, "Your Rating"),
                                React.createElement("div", { className: "flex justify-start gap-2" }, renderStars())),
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement("label", { className: "block text-sm font-medium text-gray-700" }, "Your Review"),
                                React.createElement(textarea_1.Textarea, { placeholder: "Share your experience with us...", value: message, onChange: function (e) { return setMessage(e.target.value); }, required: true, className: "min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg resize-none" })),
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement("label", { className: "block text-sm font-medium text-gray-700" }, "Profile Picture (Optional)"),
                                React.createElement("div", { className: "relative" },
                                    React.createElement("input", { type: "file", accept: "image/*", onChange: handleImageUpload, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }),
                                    React.createElement(button_1.Button, { type: "button", variant: "outline", className: "w-full h-11 bg-accent border-none" },
                                        React.createElement(lucide_react_1.Upload, { className: "mr-2 h-4 w-4" }),
                                        customImage ? "Image Selected" : "Upload Image"))),
                            React.createElement(button_1.Button, { type: "submit", disabled: isSubmitting || rating === 0, className: "w-full h-11 bg-primary text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" }, isSubmitting ? (React.createElement("div", { className: "flex items-center justify-center" },
                                React.createElement(lucide_react_1.Loader2, { className: "w-5 h-5 animate-spin mr-2" }),
                                "Submitting...")) : ("Submit Review")))))))));
}
exports["default"] = TestimonialForm;
