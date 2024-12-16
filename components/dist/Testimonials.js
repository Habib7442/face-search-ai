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
exports.InfiniteMovingCardsDemo = void 0;
var react_1 = require("react");
var infinite_moving_cards_1 = require("./ui/infinite-moving-cards");
var supabase_1 = require("@/lib/supabase");
var Loading_1 = require("./Loading");
function InfiniteMovingCardsDemo() {
    var _this = this;
    var _a = react_1.useState([]), testimonials = _a[0], setTestimonials = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    react_1.useEffect(function () {
        fetchTestimonials();
    }, []);
    var fetchTestimonials = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error, formattedTestimonials, error_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, supabase_1.supabase
                            .from("testimonials")
                            .select("*")
                            .order("created_at", { ascending: false })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    return [4 /*yield*/, Promise.all((data || []).map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var avatarUrl, _a, signedData, signedError, err_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        avatarUrl = "/default-avatar.png";
                                        if (!item.user_image_url) return [3 /*break*/, 4];
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, supabase_1.supabase.storage
                                                .from("testimonial-images")
                                                .createSignedUrl(item.user_image_url, 3600)];
                                    case 2:
                                        _a = _b.sent(), signedData = _a.data, signedError = _a.error;
                                        if (!signedError && signedData) {
                                            avatarUrl = signedData.signedUrl;
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_1 = _b.sent();
                                        console.error("Error getting signed URL:", err_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/, {
                                            quote: item.message,
                                            name: item.name,
                                            title: new Date(item.created_at).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric"
                                            }),
                                            avatar_url: avatarUrl,
                                            rating: item.rating
                                        }];
                                }
                            });
                        }); }))];
                case 2:
                    formattedTestimonials = _b.sent();
                    setTestimonials(formattedTestimonials);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _b.sent();
                    console.error("Error fetching testimonials:", error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (isLoading) {
        return (React.createElement(Loading_1["default"], null));
    }
    return (React.createElement("div", { className: "h-full rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden" },
        React.createElement(infinite_moving_cards_1.InfiniteMovingCards, { items: testimonials, direction: "right", speed: "fast" })));
}
exports.InfiniteMovingCardsDemo = InfiniteMovingCardsDemo;
