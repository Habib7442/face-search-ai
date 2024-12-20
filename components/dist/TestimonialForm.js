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
var framer_motion_1 = require("framer-motion");
var supabase_1 = require("@/lib/supabase");
var utils_1 = require("@/lib/utils");
var lucide_react_2 = require("lucide-react");
function TestimonialForm() {
    var _this = this;
    var user = hooks_1.useAppSelector(function (state) { return state.user; });
    var _a = react_1.useState(0), rating = _a[0], setRating = _a[1];
    var _b = react_1.useState(""), message = _b[0], setMessage = _b[1];
    var _c = react_1.useState(null), customImage = _c[0], setCustomImage = _c[1];
    var _d = react_1.useState(false), isSubmitting = _d[0], setIsSubmitting = _d[1];
    var _e = react_1.useState(0), hoveredStar = _e[0], setHoveredStar = _e[1];
    var handleImageUpload = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                sonner_1.toast.error("Image size should be less than 5MB");
                return;
            }
            if (!file.type.startsWith("image/")) {
                sonner_1.toast.error("Please upload an image file");
                return;
            }
            setCustomImage(file);
            sonner_1.toast.success("Image selected successfully");
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var imageUrl, fileExt, fileName, uploadError, insertError, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!user.id || rating === 0) {
                        sonner_1.toast.error("Please login and provide a rating");
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
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
                    uploadError = (_a.sent()).error;
                    if (uploadError)
                        throw uploadError;
                    imageUrl = fileName;
                    _a.label = 3;
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
                    insertError = (_a.sent()).error;
                    if (insertError)
                        throw insertError;
                    setRating(0);
                    setMessage("");
                    setCustomImage(null);
                    sonner_1.toast.success("Thank you for your testimonial!");
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
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
    if (!user.id) {
        return (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "flex min-h-[400px] items-center justify-center" },
            React.createElement("div", { className: "text-center space-y-4" },
                React.createElement("p", { className: "text-slate-600" }, "Please login to submit a testimonial."),
                React.createElement(button_1.Button, { onClick: function () { return window.location.href = '/sign-in'; }, className: "bg-indigo-600 hover:bg-indigo-700 text-white" }, "Sign In"))));
    }
    return (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-8" },
        React.createElement("form", { onSubmit: handleSubmit, className: "space-y-8" },
            React.createElement("div", { className: "space-y-4" },
                React.createElement("label", { className: "block text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" }, "Your Rating"),
                React.createElement("div", { className: "flex gap-3 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm" }, [1, 2, 3, 4, 5].map(function (starValue) { return (React.createElement(framer_motion_1.motion.button, { key: starValue, type: "button", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, onClick: function () { return setRating(starValue); }, onMouseEnter: function () { return setHoveredStar(starValue); }, onMouseLeave: function () { return setHoveredStar(0); }, className: "focus:outline-none transition-transform duration-200" },
                    React.createElement(lucide_react_1.Star, { className: utils_1.cn("w-8 h-8 transition-all duration-200", starValue <= (hoveredStar || rating)
                            ? "text-yellow-400 dark:text-yellow-300 fill-yellow-400 dark:fill-yellow-300"
                            : "text-slate-300 dark:text-slate-600 hover:text-yellow-200 dark:hover:text-yellow-500") }))); }))),
            React.createElement("div", { className: "space-y-4" },
                React.createElement("label", { className: "block text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" }, "Your Review"),
                React.createElement(textarea_1.Textarea, { value: message, onChange: function (e) { return setMessage(e.target.value); }, placeholder: "Share your experience with us...", required: true, className: utils_1.cn("min-h-[160px]", "bg-slate-50/50 dark:bg-slate-800/50", "backdrop-blur-sm", "border border-slate-200/50 dark:border-slate-700/50", "focus:border-blue-500 dark:focus:border-blue-400", "focus:ring-blue-500/20 dark:focus:ring-blue-400/20", "rounded-xl", "resize-none", "text-slate-900 dark:text-slate-100", "placeholder:text-slate-400 dark:placeholder:text-slate-500") })),
            React.createElement("div", { className: "space-y-4" },
                React.createElement("label", { className: "block text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" }, "Profile Picture (Optional)"),
                React.createElement("div", { className: "relative" },
                    React.createElement("input", { type: "file", accept: "image/*", onChange: handleImageUpload, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }),
                    React.createElement(button_1.Button, { type: "button", variant: "outline", className: utils_1.cn("w-full h-12", "bg-slate-50/50 dark:bg-slate-800/50", "backdrop-blur-sm", "border border-slate-200/50 dark:border-slate-700/50", "hover:bg-slate-100/50 dark:hover:bg-slate-700/50", "text-slate-700 dark:text-slate-300", "rounded-xl") },
                        React.createElement(lucide_react_1.Upload, { className: "mr-2 h-5 w-5" }),
                        customImage ? "Image Selected" : "Upload Image"))),
            React.createElement(framer_motion_1.AnimatePresence, { mode: "wait" },
                React.createElement(framer_motion_1.motion.div, { key: isSubmitting ? "submitting" : "idle", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } },
                    React.createElement(button_1.Button, { type: "submit", disabled: isSubmitting || rating === 0, className: utils_1.cn("w-full h-12", "bg-gradient-to-r from-blue-600 to-indigo-600", "hover:from-blue-500 hover:to-indigo-500", "dark:from-blue-500 dark:to-indigo-500", "dark:hover:from-blue-400 dark:hover:to-indigo-400", "text-white font-medium", "rounded-xl", "shadow-lg hover:shadow-xl", "transition-all duration-300", "disabled:opacity-50 disabled:cursor-not-allowed", "disabled:hover:shadow-lg") }, isSubmitting ? (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex items-center justify-center gap-3" },
                        React.createElement(lucide_react_1.Loader2, { className: "w-5 h-5 animate-spin" }),
                        React.createElement("span", null, "Submitting..."))) : (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex items-center justify-center gap-3" },
                        React.createElement(lucide_react_2.Send, { className: "w-5 h-5" }),
                        React.createElement("span", null, "Submit Review")))))))));
}
exports["default"] = TestimonialForm;
