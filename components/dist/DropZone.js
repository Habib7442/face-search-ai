"use client";
"use strict";
exports.__esModule = true;
exports.DropZone = void 0;
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var utils_1 = require("@/lib/utils");
function DropZone(_a) {
    var onDrop = _a.onDrop, dragActive = _a.dragActive, setDragActive = _a.setDragActive;
    var handleDrop = function (e) {
        var _a;
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        var file = (_a = e.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file && file.type.startsWith("image/")) {
            onDrop(file);
        }
    };
    return (React.createElement("div", { className: "relative h-80", onDragEnter: function () { return setDragActive(true); }, onDragLeave: function () { return setDragActive(false); }, onDragOver: function (e) { return e.preventDefault(); }, onDrop: handleDrop },
        React.createElement(framer_motion_1.motion.div, { className: utils_1.cn("h-full rounded-2xl transition-all duration-300 backdrop-blur-sm", "border-2 border-dashed", dragActive
                ? "border-blue-500 dark:border-blue-400 bg-blue-500/10 dark:bg-blue-400/10"
                : "border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800", "bg-white/50 dark:bg-slate-800/50", "shadow-lg hover:shadow-xl"), whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 } },
            React.createElement("label", { htmlFor: "image-upload", className: "flex flex-col items-center justify-center h-full cursor-pointer p-6" },
                React.createElement(framer_motion_1.motion.div, { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.2 }, className: utils_1.cn("p-4 rounded-full", "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40", "shadow-lg") },
                    React.createElement(lucide_react_1.Upload, { className: "h-10 w-10 text-blue-600 dark:text-blue-400" })),
                React.createElement(framer_motion_1.motion.div, { className: "mt-6 space-y-2 text-center", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.3 } },
                    React.createElement("h3", { className: "text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" }, "Drop your image here"),
                    React.createElement("p", { className: "text-slate-600 dark:text-slate-300" }, "or click to browse files")),
                React.createElement(framer_motion_1.motion.div, { className: "mt-6 flex flex-col items-center gap-3", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.4 } },
                    React.createElement("div", { className: "flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400" },
                        React.createElement(lucide_react_1.FileImage, { className: "h-4 w-4" }),
                        React.createElement("span", null, "Supports: JPG, PNG, GIF")),
                    React.createElement("div", { className: "flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400" },
                        React.createElement(lucide_react_1.FileUp, { className: "h-4 w-4" }),
                        React.createElement("span", null, "Max file size: 5MB"))),
                dragActive && (React.createElement(framer_motion_1.motion.div, { className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 dark:from-blue-400/20 dark:to-indigo-400/20 backdrop-blur-sm flex items-center justify-center", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
                    React.createElement("div", { className: "bg-white/90 dark:bg-slate-800/90 p-4 rounded-xl shadow-lg" },
                        React.createElement("p", { className: "text-blue-600 dark:text-blue-400 font-medium" }, "Release to upload"))))),
            React.createElement("input", { id: "image-upload", type: "file", accept: "image/*", onChange: function (e) {
                    var _a;
                    var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (file) {
                        onDrop(file);
                    }
                }, className: "hidden" }))));
}
exports.DropZone = DropZone;
