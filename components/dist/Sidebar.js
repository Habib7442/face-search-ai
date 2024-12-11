"use client";
"use strict";
exports.__esModule = true;
exports.LogoIcon = exports.Logo = exports.SidebarDemo = void 0;
var react_1 = require("react");
var icons_react_1 = require("@tabler/icons-react");
var link_1 = require("next/link");
var framer_motion_1 = require("framer-motion");
var image_1 = require("next/image");
var utils_1 = require("@/lib/utils");
var sidebar_1 = require("./ui/sidebar");
var hooks_1 = require("@/lib/redux/hooks");
var creditsSlice_1 = require("@/lib/redux/features/credits/creditsSlice");
// import { SignOutButton } from "@clerk/nextjs";
var lucide_react_1 = require("lucide-react");
function SidebarDemo() {
    var dispatch = hooks_1.useAppDispatch();
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    // Use Redux state for user information
    var isVerified = hooks_1.useAppSelector(function (state) { return state.user; }).isVerified;
    react_1.useEffect(function () {
        dispatch(creditsSlice_1.fetchUserCredits());
    }, [dispatch]);
    var links = [
        {
            label: "Home",
            href: "/",
            icon: (react_1["default"].createElement(lucide_react_1.HomeIcon, { className: "text-neutral-700 dark:text-pink-300 h-5 w-5 flex-shrink-0" }))
        },
        {
            label: "Dashboard",
            href: "/upload",
            icon: (react_1["default"].createElement(icons_react_1.IconBrandTabler, { className: "text-neutral-700 dark:text-orange-300 h-5 w-5 flex-shrink-0" }))
        },
        {
            label: "Profile",
            href: "#",
            icon: (react_1["default"].createElement(icons_react_1.IconUserBolt, { className: "text-neutral-700 dark:text-blue-300 h-5 w-5 flex-shrink-0" }))
        },
        {
            label: "Reviews",
            href: "/reviews",
            icon: (react_1["default"].createElement(lucide_react_1.NotebookIcon, { className: "text-neutral-700 dark:text-green-300 h-5 w-5 flex-shrink-0" }))
        },
        {
            label: "History",
            href: "/history",
            icon: (react_1["default"].createElement(lucide_react_1.HistoryIcon, { className: "text-yellow-700 dark:text-yellow-300 h-5 w-5 flex-shrink-0" }))
        },
    ];
    return (react_1["default"].createElement("div", { className: utils_1.cn("flex flex-col md:flex-row bg-[#cbd5e1] w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden", "h-full") },
        react_1["default"].createElement(sidebar_1.Sidebar, { open: open, setOpen: setOpen },
            react_1["default"].createElement(sidebar_1.SidebarBody, { className: "justify-between gap-10" },
                react_1["default"].createElement("div", { className: "flex flex-col flex-1 overflow-y-auto overflow-x-hidden" },
                    open ? react_1["default"].createElement(exports.Logo, null) : react_1["default"].createElement(exports.LogoIcon, null),
                    react_1["default"].createElement("div", { className: "mt-8 flex flex-col gap-2" }, links.map(function (link, idx) { return (react_1["default"].createElement(sidebar_1.SidebarLink, { key: idx, link: link })); }))),
                react_1["default"].createElement("div", null, isVerified && (react_1["default"].createElement("div", { className: "flex items-center space-x-2" },
                    react_1["default"].createElement("div", { className: "w-8 h-8 border border-gray-300 rounded-full bg-gray-200" }))))))));
}
exports.SidebarDemo = SidebarDemo;
// Logo components remain the same
exports.Logo = function () {
    return (react_1["default"].createElement(link_1["default"], { href: "#", className: "font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-50" },
        react_1["default"].createElement(image_1["default"], { src: "/logo-facesearch.png", alt: "FaceSearch AI Logo", width: 40, height: 40, className: "object-contain" }),
        react_1["default"].createElement(framer_motion_1.motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "font-medium text-black dark:text-white whitespace-pre" }, "FaceSearch AI")));
};
exports.LogoIcon = function () {
    return (react_1["default"].createElement(link_1["default"], { href: "#", className: "font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-50" },
        react_1["default"].createElement(image_1["default"], { src: "/logo-facesearch.jpeg", alt: "FaceSearch AI Logo", width: 40, height: 40, className: "object-contain" })));
};
