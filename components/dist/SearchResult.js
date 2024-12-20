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
var utils_1 = require("@/lib/utils");
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
    return (React.createElement(framer_motion_1.motion.div, { className: "space-y-8", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 } }, sortedGroups.map(function (groupNumber) { return (React.createElement(framer_motion_1.motion.div, { key: groupNumber, className: "space-y-6", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.4 } },
        React.createElement("div", { className: "flex items-center gap-4" },
            React.createElement(badge_1.Badge, { variant: "secondary", className: utils_1.cn("px-4 py-2 text-base font-medium rounded-full", "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40", "text-blue-700 dark:text-blue-300", "border border-blue-200/50 dark:border-blue-800/50") },
                "Group ",
                groupNumber),
            React.createElement("div", { className: "h-[1px] bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 dark:to-transparent flex-grow" })),
        React.createElement("div", { className: "relative" },
            React.createElement("div", { className: "flex overflow-x-auto pb-6 space-x-4 scrollbar-thin scrollbar-track-slate-200 dark:scrollbar-track-slate-800 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700" }, groupedResults[groupNumber].map(function (result, index) { return (React.createElement(framer_motion_1.motion.div, { key: index, initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.3, delay: index * 0.1 }, className: "cursor-pointer group flex-shrink-0 w-80", onClick: function () { return dispatch(selectedImagesSlice_1.toggleSelectedImage(result.imageUrl)); } },
                React.createElement(card_1.Card, { className: utils_1.cn("overflow-hidden transition-all duration-300", "bg-white dark:bg-slate-900", "border border-slate-200 dark:border-slate-800", "hover:border-blue-300 dark:hover:border-blue-700", "group-hover:shadow-lg dark:group-hover:shadow-slate-900/50", "relative", selectedImages.includes(result.imageUrl) &&
                        "ring-2 ring-blue-500 dark:ring-blue-400") },
                    React.createElement("div", { className: "relative aspect-video" },
                        React.createElement(image_1["default"], { src: result.imageUrl, alt: "Search result " + (index + 1), fill: true, className: "object-cover transition-all duration-500 group-hover:scale-105", sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" }),
                        React.createElement("div", { className: utils_1.cn("absolute inset-0 transition-opacity duration-300", "bg-gradient-to-t from-black/60 via-transparent to-transparent", "opacity-0 group-hover:opacity-100") }),
                        selectedImages.includes(result.imageUrl) && (React.createElement(framer_motion_1.motion.div, { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "absolute top-3 right-3 bg-blue-500 dark:bg-blue-400 text-white rounded-full p-2 shadow-lg" },
                            React.createElement(lucide_react_1.Check, { className: "h-4 w-4" })))),
                    React.createElement("div", { className: "p-4" },
                        React.createElement("div", { className: "flex items-center justify-between" },
                            React.createElement("a", { href: result.sourceUrl, target: "_blank", rel: "noopener noreferrer", onClick: function (e) { return e.stopPropagation(); }, className: utils_1.cn("text-sm flex items-center gap-2 max-w-[90%] truncate", "text-slate-600 dark:text-slate-400", "hover:text-blue-600 dark:hover:text-blue-400", "transition-colors duration-300") },
                                React.createElement(lucide_react_1.ExternalLink, { className: "h-4 w-4 flex-shrink-0" }),
                                React.createElement("span", { className: "truncate" }, result.sourceUrl)),
                            React.createElement(framer_motion_1.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, className: utils_1.cn("p-2 rounded-full", "bg-slate-100 dark:bg-slate-800", "hover:bg-blue-100 dark:hover:bg-blue-900", "transition-colors duration-300"), onClick: function (e) {
                                    e.stopPropagation();
                                    // Add your info/details handler here
                                } },
                                React.createElement(lucide_react_1.Info, { className: "h-4 w-4 text-slate-600 dark:text-slate-400" }))))))); }))))); })));
}
exports.SearchResults = SearchResults;
