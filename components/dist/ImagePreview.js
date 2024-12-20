"use client";
"use strict";
exports.__esModule = true;
exports.ImagePreview = void 0;
var image_1 = require("next/image");
var framer_motion_1 = require("framer-motion");
var GlassCard_1 = require("@/components/GlassCard");
function ImagePreview(_a) {
    var src = _a.src, alt = _a.alt, title = _a.title, sourceUrl = _a.sourceUrl;
    return (React.createElement(GlassCard_1.GlassCard, { className: "p-6" },
        React.createElement("h2", { className: "text-xl font-semibold mb-4 text-slate-800 dark:text-white" }, title),
        React.createElement(framer_motion_1.motion.div, { className: "relative aspect-square rounded-lg overflow-hidden", whileHover: { scale: 1.02 }, transition: { duration: 0.2 } },
            React.createElement(image_1["default"], { src: src, alt: alt, fill: true, className: "object-cover", sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" })),
        sourceUrl && (React.createElement(framer_motion_1.motion.p, { className: "mt-4 text-sm text-slate-400 break-words", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 } },
            "Source:",
            " ",
            React.createElement("a", { href: sourceUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 underline" }, sourceUrl)))));
}
exports.ImagePreview = ImagePreview;
