"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var link_1 = require("next/link");
var image_1 = require("next/image");
var Logo = function () {
    return (React.createElement(link_1["default"], { href: "/", className: "flex items-center space-x-2" },
        React.createElement(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
            React.createElement(image_1["default"], { src: "/logo-facesearch.svg", alt: "FaceSearch AI Logo", width: 100, height: 100, className: "object-contain rounded-md bg-slate-950 w-12 h-12" }))));
};
exports["default"] = Logo;
