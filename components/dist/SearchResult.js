"use client";
"use strict";
exports.__esModule = true;
exports.SearchResults = void 0;
var framer_motion_1 = require("framer-motion");
var image_1 = require("next/image");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var react_redux_1 = require("react-redux");
var selectedImagesSlice_1 = require("@/lib/redux/slices/selectedImagesSlice");
function SearchResults(_a) {
    var results = _a.results, onSelectResult = _a.onSelectResult;
    var dispatch = react_redux_1.useDispatch();
    var selectedImages = react_redux_1.useSelector(selectedImagesSlice_1.selectSelectedImages);
    // Group results by group number
    var groupedResults = results.reduce(function (acc, result) {
        if (!acc[result.group]) {
            acc[result.group] = [];
        }
        acc[result.group].push(result);
        return acc;
    }, {});
    // Sort group numbers
    var sortedGroups = Object.keys(groupedResults)
        .map(Number)
        .sort(function (a, b) { return a - b; });
    return (React.createElement(framer_motion_1.motion.div, { className: "space-y-6", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 } }, sortedGroups.map(function (groupNumber) { return (React.createElement("div", { key: groupNumber, className: "space-y-4" },
        React.createElement("div", { className: "flex items-center gap-4" },
            React.createElement(badge_1.Badge, { variant: "secondary", className: "text-base" },
                "Group ",
                groupNumber),
            React.createElement("div", { className: "h-[1px] bg-gray-700 flex-grow" })),
        React.createElement("div", { className: "flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700" }, groupedResults[groupNumber].map(function (result, index) { return (React.createElement(framer_motion_1.motion.div, { key: index, initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.3 }, className: "cursor-pointer group flex-shrink-0 w-72", onClick: function () { return dispatch(selectedImagesSlice_1.toggleSelectedImage(result.imageUrl)); } },
            React.createElement(card_1.Card, { className: "overflow-hidden bg-gray-900 border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg relative " + (selectedImages.includes(result.imageUrl) ? 'ring-2 ring-[#007BFF]' : '') },
                React.createElement("div", { className: "relative aspect-video" },
                    React.createElement(image_1["default"], { src: result.imageUrl, alt: "Search result " + (index + 1), fill: true, className: "object-cover transition-transform duration-300 group-hover:scale-105", sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" }),
                    selectedImages.includes(result.imageUrl) && (React.createElement("div", { className: "absolute top-2 right-2 bg-[#007BFF] text-white rounded-full p-1" },
                        React.createElement(lucide_react_1.Check, { className: "h-4 w-4" })))),
                React.createElement("div", { className: "p-4" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("a", { href: result.sourceUrl, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-gray-400 hover:text-white flex items-center gap-1", onClick: function (e) { return e.stopPropagation(); } },
                            React.createElement(lucide_react_1.ExternalLink, { className: "h-4 w-4" }),
                            result.sourceUrl)))))); })))); })));
}
exports.SearchResults = SearchResults;
