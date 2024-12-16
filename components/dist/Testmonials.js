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
var image_1 = require("next/image");
var link_1 = require("next/link");
var button_1 = require("@/components/ui/button");
var framer_motion_1 = require("framer-motion");
var Loading_1 = require("./Loading");
var supabase_1 = require("@/lib/supabase");
function TestimonialsDisplay() {
    var _this = this;
    var _a = react_1.useState([]), testimonials = _a[0], setTestimonials = _a[1];
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState({}), imageUrls = _c[0], setImageUrls = _c[1];
    react_1.useEffect(function () {
        fetchTestimonials();
    }, []);
    var fetchTestimonials = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error, urls, _i, _b, testimonial, _c, signedData, signedError, err_1, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    setIsLoading(true);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 9, 10, 11]);
                    return [4 /*yield*/, supabase_1.supabase
                            .from("testimonials")
                            .select("*")
                            .order("created_at", { ascending: false })];
                case 2:
                    _a = _d.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    setTestimonials(data || []);
                    urls = {};
                    _i = 0, _b = data || [];
                    _d.label = 3;
                case 3:
                    if (!(_i < _b.length)) return [3 /*break*/, 8];
                    testimonial = _b[_i];
                    if (!testimonial.user_image_url) return [3 /*break*/, 7];
                    _d.label = 4;
                case 4:
                    _d.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, supabase_1.supabase.storage
                            .from("testimonial-images")
                            .createSignedUrl(testimonial.user_image_url, 3600)];
                case 5:
                    _c = _d.sent(), signedData = _c.data, signedError = _c.error;
                    if (!signedError && signedData) {
                        urls[testimonial.id] = signedData.signedUrl;
                    }
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _d.sent();
                    console.error("Error getting signed URL:", err_1);
                    urls[testimonial.id] = "/default-avatar.png";
                    return [3 /*break*/, 7];
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8:
                    setImageUrls(urls);
                    return [3 /*break*/, 11];
                case 9:
                    error_1 = _d.sent();
                    console.error("Error fetching testimonials:", error_1);
                    return [3 /*break*/, 11];
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var renderStars = function (rating) {
        return [1, 2, 3, 4, 5].map(function (starValue) { return (react_1["default"].createElement(lucide_react_1.Star, { key: starValue, className: "h-4 w-4 " + (starValue <= rating
                ? "text-[#FF8C00] fill-[#FF8C00]"
                : "text-gray-300") })); });
    };
    if (isLoading) {
        return react_1["default"].createElement(Loading_1["default"], null);
    }
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-gradient-to-b from-[#dfeeff] to-white" },
        react_1["default"].createElement("div", { className: "container mx-auto px-4 py-12" },
            react_1["default"].createElement("div", { className: "flex justify-between items-center mb-12" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h1", { className: "text-4xl font-bold text-gray-800 mb-2" }, "Customer Reviews"),
                    react_1["default"].createElement("p", { className: "text-gray-600" }, "Real experiences from our valued users")),
                react_1["default"].createElement(link_1["default"], { href: "/" },
                    react_1["default"].createElement(button_1.Button, { variant: "outline", className: "bg-primary hover:primary-hover text-primary-foreground border-gray-200" },
                        react_1["default"].createElement(lucide_react_1.ArrowLeft, { className: "mr-2 h-4 w-4" }),
                        "Back to Home"))),
            testimonials.length === 0 ? (react_1["default"].createElement("div", { className: "text-center text-gray-500 text-xl py-16 bg-white rounded-lg shadow-sm" }, "No testimonials yet. Be the first to share your experience!")) : (react_1["default"].createElement(framer_motion_1.motion.div, { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }, testimonials.map(function (testimonial, index) { return (react_1["default"].createElement(framer_motion_1.motion.div, { key: testimonial.id, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, className: "bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300" },
                react_1["default"].createElement("div", { className: "flex items-start space-x-4 mb-4" },
                    react_1["default"].createElement("div", { className: "relative flex-shrink-0" },
                        react_1["default"].createElement(image_1["default"], { src: imageUrls[testimonial.id] || "/default-avatar.png", alt: testimonial.name, width: 48, height: 48, className: "rounded-full object-cover ring-2 ring-[#007BFF]/10", onError: function (e) {
                                var target = e.target;
                                target.src = "/default-avatar.png";
                            } })),
                    react_1["default"].createElement("div", { className: "flex-1 min-w-0" },
                        react_1["default"].createElement("h3", { className: "text-gray-900 font-semibold truncate" }, testimonial.name),
                        react_1["default"].createElement("div", { className: "flex items-center space-x-1 mt-1" }, renderStars(testimonial.rating))),
                    react_1["default"].createElement("div", { className: "text-xs text-gray-500" }, new Date(testimonial.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    }))),
                react_1["default"].createElement("blockquote", { className: "mt-4 text-gray-700 text-sm leading-relaxed" },
                    "\"",
                    testimonial.message,
                    "\""))); }))))));
}
exports["default"] = TestimonialsDisplay;
