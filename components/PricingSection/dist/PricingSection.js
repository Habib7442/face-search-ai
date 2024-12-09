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
var nextjs_1 = require("@clerk/nextjs");
var react_1 = require("react");
var sonner_1 = require("sonner");
var react_wrap_balancer_1 = require("react-wrap-balancer");
var pricing_cards_1 = require("./pricing-cards");
var PricingSection = function () {
    var _a = nextjs_1.useAuth(), isSignedIn = _a.isSignedIn, isLoaded = _a.isLoaded;
    var _b = react_1.useState(null), loadingPlan = _b[0], setLoadingPlan = _b[1];
    var pricingPlans = [
        {
            id: "basic",
            name: "Basic",
            price: "$9.99",
            period: "month",
            description: "Perfect for individuals starting with face search",
            features: [
                "10 Face searches per day",
                "Basic web search results",
                "Email support",
                "Export search history",
                "Standard API access",
            ],
            highlighted: false,
            buttonText: "Get Started",
            stripePriceId: "price_1QNsUeSABw0Heq1mTI8fY0jE"
        },
        {
            id: "pro",
            name: "Pro",
            price: "$24.99",
            period: "month",
            description: "Ideal for professionals and small teams",
            features: [
                "50 Face searches per day",
                "Advanced search filters",
                "Priority support",
                "Contact information finder",
                "Custom poem generation",
                "Advanced API access",
                "Bulk search capability",
            ],
            highlighted: true,
            buttonText: "Try Pro Plan",
            badge: "Most Popular",
            stripePriceId: "price_1QNsWGSABw0Heq1mCNToLIF2"
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: "Custom",
            period: "month",
            description: "For organizations requiring advanced solutions",
            features: [
                "Unlimited face searches",
                "Dedicated support team",
                "Custom integration",
                "Advanced analytics",
                "White-label option",
                "Enterprise API access",
                "Custom feature development",
            ],
            highlighted: false,
            buttonText: "Contact Sales",
            stripePriceId: "price_1QNsYkSABw0Heq1mPMQtOsBB"
        },
    ];
    var handlePurchase = function (plan) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isLoaded)
                        return [2 /*return*/];
                    if (!isSignedIn) {
                        sonner_1.toast("You need to be signed in to purchase a plan");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    setLoadingPlan(plan.id);
                    return [4 /*yield*/, fetch("/api/create-checkout-session", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ planId: plan.id })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.error || "Failed to create checkout session");
                    }
                    window.location.href = data.url;
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error("Purchase error:", error_1);
                    sonner_1.toast("Failed to initiate checkout. Please try again.");
                    return [3 /*break*/, 6];
                case 5:
                    setLoadingPlan(null);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("section", { className: "w-full relative min-h-full px-4 mb-8" },
        React.createElement("div", { className: "absolute inset-0 overflow-hidden" },
            React.createElement("div", { className: "absolute -top-1/3 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl" }),
            React.createElement("div", { className: "absolute -bottom-1/3 -left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-3xl" })),
        React.createElement("div", { className: "container relative z-10 max-w-7xl mx-auto" },
            React.createElement("div", { className: "text-center space-y-4 mb-16" },
                React.createElement("h2", { className: "text-4xl md:text-5xl font-bold" }, "Choose Your Plan"),
                React.createElement(react_wrap_balancer_1["default"], null,
                    React.createElement("p", { className: "text-lg md:text-xl text-gray-600 max-w-2xl mx-auto" }, "Select the perfect plan that suits your needs and unlock the full potential of FaceSearch AI."))),
            React.createElement(pricing_cards_1["default"], { pricingPlans: pricingPlans, handlePurchase: handlePurchase, loadingPlan: loadingPlan, isLoaded: isLoaded }))));
};
exports["default"] = PricingSection;
