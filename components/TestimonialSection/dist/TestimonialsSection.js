"use strict";
exports.__esModule = true;
// components/TestimonialsSection.tsx
var react_wrap_balancer_1 = require("react-wrap-balancer");
var Testimonials_1 = require("../Testimonials");
var TestimonialsSection = function () {
    return (React.createElement("section", { className: "relative w-full min-h-full py-10 overflow-hidden" },
        React.createElement("div", { className: "relative z-10 container mx-auto px-4" },
            React.createElement("div", { className: "text-center mb-16 space-y-4" },
                React.createElement("h2", { className: "text-4xl md:text-5xl font-bold" }, "What Our Users Say"),
                React.createElement("p", { className: "text-lg md:text-xl max-w-2xl mx-auto" },
                    React.createElement(react_wrap_balancer_1["default"], null, "Hear from our community about their experiences with our AI face matching technology"))),
            React.createElement("div", { className: "relative" },
                React.createElement("div", { className: "relative z-20" },
                    React.createElement(Testimonials_1.InfiniteMovingCardsDemo, null))))));
};
exports["default"] = TestimonialsSection;
