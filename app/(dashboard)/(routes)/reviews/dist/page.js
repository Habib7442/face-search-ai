"use client";
"use strict";
exports.__esModule = true;
var TestimonialForm_1 = require("@/components/TestimonialForm");
var Reviews = function () {
    return (React.createElement("div", { className: "min-h-screen flex items-center justify-center p-6" },
        React.createElement("div", { className: "w-full bg-secondary max-w-5xl grid lg:grid-cols-2 gap-8  rounded-2xl overflow-hidden shadow-md" },
            React.createElement("div", { className: "relative hidden lg:block xl:block " },
                React.createElement("div", { className: "absolute inset-0 flex items-center justify-center" },
                    React.createElement("div", { className: "text-center text-white p-6" },
                        React.createElement("h1", { className: "text-4xl font-bold mb-4 text-primary" }, "Share Your Experience"),
                        React.createElement("p", { className: "text-lg text-black" }, "Your feedback helps us improve and serves as inspiration for others.")))),
            React.createElement("div", { className: "flex items-center justify-center p-2 md:p-12" },
                React.createElement("div", { className: "w-full max-w-md" },
                    React.createElement(TestimonialForm_1["default"], null))))));
};
exports["default"] = Reviews;
