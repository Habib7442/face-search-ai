"use client";
"use strict";
exports.__esModule = true;
exports.InfiniteMovingCards = void 0;
var utils_1 = require("@/lib/utils");
var image_1 = require("next/image");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
exports.InfiniteMovingCards = function (_a) {
    var items = _a.items, _b = _a.direction, direction = _b === void 0 ? "left" : _b, _c = _a.speed, speed = _c === void 0 ? "fast" : _c, _d = _a.pauseOnHover, pauseOnHover = _d === void 0 ? true : _d, className = _a.className;
    var containerRef = react_1["default"].useRef(null);
    var scrollerRef = react_1["default"].useRef(null);
    react_1.useEffect(function () {
        addAnimation();
    }, [items]);
    var _e = react_1.useState(false), start = _e[0], setStart = _e[1];
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            var scrollerContent = Array.from(scrollerRef.current.children);
            // Clear existing duplicates first
            while (scrollerRef.current.children.length > items.length) {
                scrollerRef.current.removeChild(scrollerRef.current.lastChild);
            }
            // Add new duplicates
            scrollerContent.forEach(function (item) {
                var duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });
            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    var renderStars = function (rating) {
        return (react_1["default"].createElement("div", { className: "flex space-x-1" }, [1, 2, 3, 4, 5].map(function (star) { return (react_1["default"].createElement(lucide_react_1.Star, { key: star, className: utils_1.cn("h-4 w-4", star <= rating
                ? "text-[#FF8C00] fill-[#FF8C00]"
                : "text-gray-300") })); })));
    };
    var getDirection = function () {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            }
            else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };
    var getSpeed = function () {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            }
            else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            }
            else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    console.log(items);
    return (react_1["default"].createElement("div", { ref: containerRef, className: utils_1.cn("scroller relative z-20 max-w-7xl overflow-hidden", className) },
        react_1["default"].createElement("ul", { ref: scrollerRef, className: utils_1.cn("flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap", start && "animate-scroll", pauseOnHover && "hover:[animation-play-state:paused]") }, items.map(function (item, idx) { return (react_1["default"].createElement("li", { className: "w-[350px] max-w-full bg-secondary relative rounded-2xl border flex-shrink-0 border-neutral px-8 py-6 md:w-[450px]", key: idx },
            react_1["default"].createElement("blockquote", null,
                react_1["default"].createElement("div", { "aria-hidden": "true", className: "user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5" }),
                react_1["default"].createElement("div", { className: "mb-4" }, renderStars(item.rating)),
                react_1["default"].createElement("span", { className: "relative z-20 text-sm leading-[1.6] text-secondary-foreground font-normal" },
                    "\"",
                    item.quote,
                    "\""),
                react_1["default"].createElement("div", { className: "relative z-20 mt-6 flex flex-row items-center space-x-4" },
                    react_1["default"].createElement("div", { className: "relative h-12 w-12 flex-shrink-0" },
                        react_1["default"].createElement(image_1["default"], { src: item.avatar_url, alt: item.name, width: 48, height: 48, className: "rounded-full object-cover ring-2 ring-[#007BFF]/10", onError: function (e) {
                                var target = e.target;
                                target.src = "/default-avatar.png";
                            } })),
                    react_1["default"].createElement("span", { className: "flex flex-col gap-1" },
                        react_1["default"].createElement("span", { className: "text-sm leading-[1.6] text-secondary-foreground font-normal" }, item.name),
                        react_1["default"].createElement("span", { className: "text-sm leading-[1.6] text-secondary-foreground font-normal" }, item.title)))))); }))));
};
