"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var image_1 = require("next/image");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var Footer = function () {
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var handleSubscribe = function (e) {
        e.preventDefault();
        // Add your newsletter subscription logic here
        setEmail("");
    };
    return (React.createElement("div", { className: "w-full h-full px-4" },
        React.createElement("footer", { className: "bg-gradient-to-b rounded-2xl from-secondary text-gray-800 shadow-md" },
            React.createElement("div", { className: "container mx-auto px-6 py-12" },
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" },
                    React.createElement("div", { className: "space-y-4" },
                        React.createElement(link_1["default"], { href: "/", className: "block" },
                            React.createElement("div", { className: "relative h-12 w-48" },
                                React.createElement(image_1["default"], { src: "/logo-facesearch.svg", alt: "FaceSearch AI Logo", fill: true, className: "object-contain" }))),
                        React.createElement("p", { className: "text-gray-600" }, "Revolutionizing face matching technology with advanced AI solutions for a more connected and secure future."),
                        React.createElement("div", { className: "flex space-x-4 mt-4" }, [
                            { icon: lucide_react_1.Facebook, href: "#" },
                            { icon: lucide_react_1.Twitter, href: "#" },
                            { icon: lucide_react_1.Instagram, href: "#" },
                            { icon: lucide_react_1.Linkedin, href: "#" },
                        ].map(function (_a, index) {
                            var Icon = _a.icon, href = _a.href;
                            return (React.createElement(link_1["default"], { key: index, href: href, className: "hover:text-blue-500 transition-colors" },
                                React.createElement(Icon, { className: "h-5 w-5" })));
                        }))),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-lg font-semibold mb-4 text-gray-800" }, "Quick Links"),
                        React.createElement("ul", { className: "space-y-2" }, ["Home", "About", "Features", "Pricing", "Contact"].map(function (item) { return (React.createElement("li", { key: item },
                            React.createElement(link_1["default"], { href: "/" + item.toLowerCase(), className: "text-gray-600 hover:text-blue-500 transition-colors" }, item))); }))),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-lg font-semibold mb-4 text-gray-800" }, "Contact Us"),
                        React.createElement("ul", { className: "space-y-4" },
                            React.createElement("li", { className: "flex items-center space-x-3 text-gray-600" },
                                React.createElement(lucide_react_1.MapPin, { className: "h-5 w-5 text-blue-500" }),
                                React.createElement("span", null, "123 AI Street, Tech Valley, CA 94043")),
                            React.createElement("li", { className: "flex items-center space-x-3 text-gray-600" },
                                React.createElement(lucide_react_1.Phone, { className: "h-5 w-5 text-blue-500" }),
                                React.createElement("span", null, "+1 (555) 123-4567")),
                            React.createElement("li", { className: "flex items-center space-x-3 text-gray-600" },
                                React.createElement(lucide_react_1.Mail, { className: "h-5 w-5 text-blue-500" }),
                                React.createElement("span", null, "support@facesearch.ai")))),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-lg font-semibold mb-4 text-gray-800" }, "Newsletter"),
                        React.createElement("p", { className: "text-gray-600 mb-4" }, "Subscribe to our newsletter for the latest updates and features."),
                        React.createElement("form", { onSubmit: handleSubscribe, className: "space-y-2" },
                            React.createElement(input_1.Input, { type: "email", placeholder: "Enter your email", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500", required: true }),
                            React.createElement(button_1.Button, { type: "submit", className: "w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg shadow-md" },
                                "Subscribe",
                                React.createElement(lucide_react_1.ArrowRight, { className: "ml-2 h-4 w-4" })))))),
            React.createElement("div", { className: "border-t border-gray-200" },
                React.createElement("div", { className: "container mx-auto px-6 py-6" },
                    React.createElement("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" },
                        React.createElement("p", { className: "text-gray-600 text-sm text-center md:text-left" },
                            "\u00A9 ",
                            new Date().getFullYear(),
                            " FaceSearch AI. All rights reserved."),
                        React.createElement("div", { className: "flex space-x-6" }, [
                            { label: "Privacy Policy", href: "/privacy" },
                            { label: "Terms of Service", href: "/terms" },
                            { label: "Cookie Policy", href: "/cookies" },
                        ].map(function (_a, index) {
                            var label = _a.label, href = _a.href;
                            return (React.createElement(link_1["default"], { key: index, href: href, className: "text-sm text-gray-600 hover:text-blue-500 transition-colors" }, label));
                        }))))))));
};
exports["default"] = Footer;
