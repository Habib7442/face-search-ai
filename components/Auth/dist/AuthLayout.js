"use strict";
exports.__esModule = true;
exports.AuthLayout = void 0;
var framer_motion_1 = require("framer-motion");
var image_1 = require("next/image");
function AuthLayout(_a) {
    var children = _a.children, isSignUp = _a.isSignUp, onToggleMode = _a.onToggleMode;
    return (React.createElement("div", { className: "flex min-h-screen flex-col-reverse md:flex-row" },
        React.createElement("div", { className: "relative w-full md:w-1/2 bg-gradient-to-b from-[#dfeeff] to-white" },
            React.createElement("div", { className: "absolute inset-0 bg-[url('/grid.svg')] opacity-10" }),
            React.createElement("div", { className: "relative flex h-full min-h-[400px] flex-col items-center justify-center px-8" },
                React.createElement("div", { className: "absolute top-8 left-8" },
                    React.createElement(image_1["default"], { src: "/logo-facesearch.svg", alt: "Logo", width: 40, height: 40, className: "object-contain" })),
                React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "text-center max-w-md" },
                    isSignUp ? (React.createElement(React.Fragment, null,
                        React.createElement(framer_motion_1.motion.h1, { className: "text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 } }, "Welcome to Facesearch AI!"),
                        React.createElement(framer_motion_1.motion.p, { className: "text-gray-600 text-lg", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 } }, "Join us and discover the power of advanced facial recognition technology."))) : (React.createElement(React.Fragment, null,
                        React.createElement(framer_motion_1.motion.h1, { className: "text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 } }, "Welcome Back!"),
                        React.createElement(framer_motion_1.motion.p, { className: "text-gray-600 text-lg", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 } }, "Continue your journey with our advanced AI technology."))),
                    React.createElement(framer_motion_1.motion.div, { className: "mt-12", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 } },
                        React.createElement(framer_motion_1.motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: onToggleMode, className: "relative inline-flex items-center justify-center px-8 py-3 font-bold overflow-hidden bg-white rounded-full group gap-2" },
                            React.createElement("span", { className: "absolute w-0 h-0 transition-all duration-500 ease-out bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full group-hover:h-full" }),
                            React.createElement("span", { className: "relative text-gray-800 group-hover:text-white transition-colors duration-200" }, isSignUp ? "Sign In" : "Create Account"),
                            React.createElement(framer_motion_1.motion.span, { className: "relative", initial: false, animate: { x: isSignUp ? 5 : -5 } }, "\u2192"))),
                    React.createElement("div", { className: "absolute bottom-8 left-0 right-0 flex justify-center gap-4" },
                        React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8 }, className: "w-2 h-2 rounded-full bg-blue-500" }),
                        React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.9 }, className: "w-2 h-2 rounded-full bg-purple-500" }),
                        React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1 }, className: "w-2 h-2 rounded-full bg-blue-500" }))))),
        React.createElement("div", { className: "w-full md:w-1/2" },
            React.createElement("div", { className: "flex min-h-[600px] flex-col justify-center px-6 py-12 sm:px-12 lg:px-16" }, children))));
}
exports.AuthLayout = AuthLayout;