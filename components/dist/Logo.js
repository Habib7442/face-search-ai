"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var link_1 = require("next/link");
var image_1 = require("next/image");
var Logo = function () {
    return (React.createElement(link_1["default"], { href: "/", className: "flex items-center space-x-2" },
        React.createElement(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
            React.createElement(image_1["default"], { src: "/logo-facesearch.svg", alt: "FaceSearch AI Logo", width: 40, height: 40, className: "object-contain rounded-md" }))));
};
exports["default"] = Logo;
