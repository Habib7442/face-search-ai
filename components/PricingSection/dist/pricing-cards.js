"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var PricingCards = function (_a) {
    var pricingPlans = _a.pricingPlans, handlePurchase = _a.handlePurchase, _b = _a.loadingPlan, loadingPlan = _b === void 0 ? "" : _b, _c = _a.isLoaded, isLoaded = _c === void 0 ? true : _c;
    var gradientColors = {
        "decentralized-intelligence-agency": "from-purple-200 to-purple-100",
        "notification-plan": "from-red-200 to-red-100",
        "most-popular": "from-blue-200 to-blue-100",
        "referral-plan": "from-green-200 to-green-100",
        "super-basic": "from-gray-200 to-gray-100"
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-4 px-2" },
            react_1["default"].createElement("div", { className: "space-y-8" },
                renderCard(pricingPlans[0]),
                renderCard(pricingPlans[1])),
            react_1["default"].createElement("div", { className: "space-y-8" },
                renderCard(pricingPlans[2]),
                renderCard(pricingPlans[3])),
            react_1["default"].createElement("div", { className: "space-y-8" }, renderCard(pricingPlans[4]))),
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md" },
            react_1["default"].createElement("h2", { className: "text-2xl font-bold text-center mb-6" }, "Plan Features Comparison"),
            react_1["default"].createElement("div", { className: "overflow-x-auto" },
                react_1["default"].createElement("table", { className: "table-auto w-full text-left border-collapse border border-gray-300" },
                    react_1["default"].createElement("thead", null,
                        react_1["default"].createElement("tr", null,
                            react_1["default"].createElement("th", { className: "border border-gray-300 px-4 py-2" }, "Feature"),
                            pricingPlans.map(function (plan) { return (react_1["default"].createElement("th", { key: plan.id, className: "border border-gray-300 px-4 py-2 text-center" }, plan.name)); }))),
                    react_1["default"].createElement("tbody", null, generateFeatureRows(pricingPlans)))))));
    function renderCard(plan) {
        var isLoading = loadingPlan === plan.id;
        var gradient = gradientColors[plan.id] || "from-gray-200 to-gray-100";
        return (react_1["default"].createElement("div", { key: plan.id, className: "flex flex-col justify-between min-h-[350px] rounded-2xl overflow-hidden transition-all duration-300 \n          hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br " + gradient + " \n          " + (plan.highlighted ? "ring-2 ring-cyan-400" : "") + "\n        " },
            react_1["default"].createElement("div", { className: "p-6 md:p-8 space-y-6" },
                react_1["default"].createElement("h3", { className: "text-2xl font-bold text-gray-900" }, plan.name),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("span", { className: "text-4xl font-extrabold text-gray-900" }, plan.price),
                    plan.price !== "Custom" && (react_1["default"].createElement("span", { className: "text-lg text-gray-600" },
                        "/",
                        plan.period))),
                react_1["default"].createElement("p", { className: "text-gray-700" }, plan.description)),
            react_1["default"].createElement(button_1.Button, { onClick: function () { return handlePurchase(plan); }, disabled: isLoading || !isLoaded, className: "w-full text-white " + (plan.highlighted
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                    : "bg-gray-800 hover:bg-gray-700") }, isLoading ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(lucide_react_1.Loader2, { className: "w-5 h-5 mr-2 animate-spin" }),
                "Processing...")) : (plan.buttonText))));
    }
    function generateFeatureRows(plans) {
        var allFeatures = Array.from(new Set(plans.flatMap(function (plan) { return plan.features; })));
        return allFeatures.map(function (feature) { return (react_1["default"].createElement("tr", { key: feature },
            react_1["default"].createElement("td", { className: "border border-gray-300 px-4 py-2" }, feature),
            plans.map(function (plan) { return (react_1["default"].createElement("td", { key: plan.id, className: "border border-gray-300 px-4 py-2 text-center" }, plan.features.includes(feature) ? "✔️" : "—")); }))); });
    }
};
exports["default"] = PricingCards;
