"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var image_upload_1 = require("@/components/HeroSection/upload/image-upload");
var framer_motion_1 = require("framer-motion");
var react_wrap_balancer_1 = require("react-wrap-balancer");
var data_1 = require("@/lib/data/data");
var react_redux_1 = require("react-redux");
var uploadedImageSlice_1 = require("@/lib/redux/slices/uploadedImageSlice");
var image_1 = require("next/image");
var HeroSection = function () {
    var _a = react_1.useState(false), isDialogOpen = _a[0], setDialogOpen = _a[1];
    var _b = react_1.useState(false), isDragging = _b[0], setIsDragging = _b[1];
    var fileInputRef = react_1.useRef(null);
    var dispatch = react_redux_1.useDispatch();
    var handleDragOver = function (e) {
        e.preventDefault();
        setIsDragging(true);
    };
    var handleDragLeave = function () {
        setIsDragging(false);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setIsDragging(false);
        var file = e.dataTransfer.files[0];
        handleFile(file);
    };
    var handleFile = function (file) {
        if (file && file.type.startsWith("image/")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                dispatch(uploadedImageSlice_1.setUploadedImage((_a = e.target) === null || _a === void 0 ? void 0 : _a.result));
                setDialogOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };
    var handleFileSelect = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file)
            handleFile(file);
    };
    return (React.createElement("section", { className: "relative min-h-full bg-light-background dark:bg-dark-background overflow-hidden" },
        React.createElement("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:opacity-50" }),
        React.createElement("div", { className: "container mx-auto px-6 py-24 text-center relative" },
            React.createElement("div", { className: "max-w-7xl mx-auto" },
                React.createElement(framer_motion_1.motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-light-primary dark:text-dark-primary font-medium mb-4" }, "WELCOME"),
                React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } },
                    React.createElement("h1", { className: "text-5xl font-bold tracking-tight text-light-foreground dark:text-dark-foreground sm:text-6xl mb-6" },
                        React.createElement(react_wrap_balancer_1["default"], null,
                            "Advanced Facial Recognition",
                            React.createElement("span", { className: "block mt-2 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent" }, "Made Simple & Secure"))),
                    React.createElement("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-light-muted-foreground dark:text-dark-muted-foreground" }, "Upload an image to instantly search and find similar faces across our secure database. Enterprise-grade facial recognition, now accessible to everyone.")),
                React.createElement("div", { className: "mt-4" },
                    React.createElement("div", { className: "flex flex-row items-center justify-center gap-8" },
                        React.createElement("a", { href: "https://play.google.com/store/apps/details?id=com.facesearch.app", target: "_blank", rel: "noopener noreferrer", className: "transition-transform hover:scale-105" },
                            React.createElement(image_1["default"], { src: "/google-badge.svg", alt: "Google Play Store", width: 100, height: 100, className: "h-[120px] w-[120px]" })),
                        React.createElement("a", { href: "#", className: "transition-transform hover:scale-105" },
                            React.createElement(image_1["default"], { src: "/apple-badge.svg", alt: "Apple App Store", width: 100, height: 100, className: "h-[120px] w-[120px]" })))),
                React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.3 }, className: "mt-12 mb-16" },
                    React.createElement("div", { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "\n                max-w-3xl mx-auto p-8 rounded-[20px] transition-all cursor-pointer relative\n                " + (isDragging
                            ? "bg-white dark:bg-[rgba(32,45,72,0.9)] border-light-primary dark:border-indigo-500"
                            : "bg-white/80 hover:bg-white dark:bg-[rgba(32,45,72,0.4)] dark:hover:bg-[rgba(32,45,72,0.6)]") + "\n                border border-light-border dark:border-[rgba(255,255,255,0.1)]\n                shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]\n                dark:backdrop-blur-[20px]\n              " },
                        React.createElement("div", { className: "absolute -z-10 inset-0 hidden dark:block" },
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/20 to-pink-500/10 blur-3xl rounded-[20px]" })),
                        React.createElement("div", { className: "flex flex-col items-center gap-4" },
                            React.createElement("div", { className: "p-4 rounded-full bg-light-primary/10 dark:bg-gradient-to-br dark:from-indigo-500/10 dark:to-purple-500/10 dark:backdrop-blur-sm dark:border dark:border-indigo-500/20" },
                                React.createElement(lucide_react_1.Upload, { className: "w-8 h-8 text-light-primary dark:text-indigo-400" })),
                            React.createElement("div", { className: "text-center" },
                                React.createElement("h3", { className: "text-lg font-semibold text-light-foreground dark:text-white" },
                                    "Drop your image here or",
                                    React.createElement("span", { className: "text-light-primary hover:text-light-primary/90 dark:text-indigo-400 dark:hover:text-indigo-300 mx-2 cursor-pointer" }, "browse")),
                                React.createElement("p", { className: "text-sm text-light-muted-foreground dark:text-slate-400 mt-1" }, "Supports JPG, PNG, WEBP up to 10MB"))),
                        React.createElement("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*", onChange: handleFileSelect })),
                    React.createElement("div", { className: "flex items-center justify-center gap-8 mt-8" },
                        React.createElement("div", { className: "flex items-center gap-2 bg-white/80 dark:bg-[rgba(32,45,72,0.4)] backdrop-blur-sm dark:backdrop-blur-[20px] px-4 py-2 rounded-full border border-light-border dark:border-[rgba(255,255,255,0.1)]" },
                            React.createElement(lucide_react_1.Shield, { className: "w-5 h-5 text-green-500 dark:text-green-400" }),
                            React.createElement("span", { className: "text-sm text-light-muted-foreground dark:text-slate-300" }, "End-to-end encrypted")),
                        React.createElement("div", { className: "flex items-center gap-2 bg-white/80 dark:bg-[rgba(32,45,72,0.4)] backdrop-blur-sm dark:backdrop-blur-[20px] px-4 py-2 rounded-full border border-light-border dark:border-[rgba(255,255,255,0.1)]" },
                            React.createElement(lucide_react_1.Search, { className: "w-5 h-5 text-light-primary dark:text-indigo-400" }),
                            React.createElement("span", { className: "text-sm text-light-muted-foreground dark:text-slate-300" }, "99.9% accuracy rate")))),
                React.createElement("div", { className: "hidden lg:flex justify-center gap-6" }, data_1.features.map(function (feature) { return (React.createElement(framer_motion_1.motion.div, { key: feature.id, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.4 }, className: "w-[280px] bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-light-border dark:border-dark-border hover:border-light-primary/50 dark:hover:border-dark-primary/50 transition-all duration-300" },
                    React.createElement("div", { className: "mb-4 text-light-primary dark:text-dark-primary flex justify-center" }, feature.icon),
                    React.createElement("h3", { className: "text-lg font-semibold mb-3 text-light-foreground dark:text-dark-foreground text-center" }, feature.title),
                    React.createElement("p", { className: "text-light-muted-foreground dark:text-dark-muted-foreground text-sm text-center" }, feature.description))); })),
                React.createElement("div", { className: "lg:hidden" },
                    React.createElement("div", { className: "md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0" }, data_1.features.map(function (feature) { return (React.createElement(framer_motion_1.motion.div, { key: feature.id, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.4 }, className: "bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-light-border dark:border-dark-border" },
                        React.createElement("div", { className: "mb-4 text-light-primary dark:text-dark-primary flex justify-center" }, feature.icon),
                        React.createElement("h3", { className: "text-lg font-semibold mb-3 text-light-foreground dark:text-dark-foreground text-center" }, feature.title),
                        React.createElement("p", { className: "text-light-muted-foreground dark:text-dark-muted-foreground text-sm text-center" }, feature.description))); }))))),
        React.createElement(image_upload_1["default"], { open: isDialogOpen, onClose: function () { return setDialogOpen(false); } })));
};
exports["default"] = HeroSection;
