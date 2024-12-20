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
var lucide_react_1 = require("lucide-react");
var userSlice_1 = require("@/lib/redux/slices/userSlice");
var navigation_1 = require("next/navigation");
function SidebarDemo() {
    var _a;
    var dispatch = hooks_1.useAppDispatch();
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var user = hooks_1.useAppSelector(function (state) { return state.user; });
    var router = navigation_1.useRouter();
    var pathname = navigation_1.usePathname();
    var handleLogout = function () {
        dispatch(userSlice_1.clearUser());
        document.cookie = "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("user");
        router.push("/sign-in");
    };
    var links = [
        {
            label: "Home",
            href: "/",
            icon: react_1["default"].createElement(lucide_react_1.HomeIcon, { className: "h-5 w-5" })
        },
        {
            label: "Dashboard",
            href: "/upload",
            icon: react_1["default"].createElement(icons_react_1.IconBrandTabler, { className: "h-5 w-5" })
        },
        {
            label: "Reviews",
            href: "/reviews",
            icon: react_1["default"].createElement(lucide_react_1.NotebookIcon, { className: "h-5 w-5" })
        },
        {
            label: "History",
            href: "/history",
            icon: react_1["default"].createElement(lucide_react_1.HistoryIcon, { className: "h-5 w-5" })
        },
        {
            label: "Logout",
            href: "#",
            icon: react_1["default"].createElement(lucide_react_1.LogOut, { className: "h-5 w-5" }),
            onClick: handleLogout
        },
    ];
    return (react_1["default"].createElement("div", { className: "h-screen bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-slate-950/50 dark:to-slate-900/50" },
        react_1["default"].createElement(sidebar_1.Sidebar, { open: open, setOpen: setOpen },
            react_1["default"].createElement(sidebar_1.SidebarBody, { className: "flex flex-col h-screen" },
                react_1["default"].createElement("div", { className: "flex flex-col flex-1" },
                    react_1["default"].createElement(framer_motion_1.motion.div, { className: "mb-8 p-2", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }, open ? react_1["default"].createElement(exports.Logo, null) : react_1["default"].createElement(exports.LogoIcon, null)),
                    react_1["default"].createElement("div", { className: "space-y-2" }, links.map(function (link, idx) {
                        var isActive = link.href === "#" ? false : pathname === link.href;
                        return (react_1["default"].createElement(sidebar_1.SidebarLink, { key: idx, link: link, className: utils_1.cn(link.label === "Logout" &&
                                "text-red-500 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20", isActive &&
                                "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400") }));
                    }))),
                user.id && (react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-auto pt-8" },
                    react_1["default"].createElement("div", { className: utils_1.cn("p-3 rounded-xl", "bg-gradient-to-br from-white/80 to-slate-50/80", "dark:from-slate-800/80 dark:to-slate-900/80", "backdrop-blur-md", "shadow-lg dark:shadow-slate-900/20", "border border-slate-200/50 dark:border-slate-700/50", "hover:border-blue-200/50 dark:hover:border-blue-800/50", "transition-all duration-300") },
                        react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                            react_1["default"].createElement("div", { className: utils_1.cn("w-10 h-10 rounded-lg", "bg-gradient-to-br from-blue-500 to-indigo-500", "dark:from-blue-400 dark:to-indigo-400", "flex items-center justify-center", "text-white font-medium", "shadow-md") }, user.name
                                ? user.name.charAt(0).toUpperCase()
                                : (_a = user.email) === null || _a === void 0 ? void 0 : _a.charAt(0).toUpperCase()),
                            open && (react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, className: "flex flex-col" },
                                react_1["default"].createElement("span", { className: "text-sm font-medium text-slate-900 dark:text-slate-100" }, user.name || "User"),
                                react_1["default"].createElement("span", { className: "text-xs text-slate-500 dark:text-slate-400" }, user.email)))))))))));
}
exports.SidebarDemo = SidebarDemo;
exports.Logo = function () {
    return (react_1["default"].createElement(link_1["default"], { href: "/", className: "flex items-center gap-3" },
        react_1["default"].createElement("div", { className: utils_1.cn("relative overflow-hidden", "rounded-xl", "bg-slate-950 dark:bg-slate-900", "shadow-lg", "transition-transform duration-300") },
            react_1["default"].createElement(image_1["default"], { src: "/logo-facesearch.svg", alt: "FaceSearch AI Logo", width: 100, height: 100, className: "object-contain w-12 h-12" }))));
};
exports.LogoIcon = function () {
    return (react_1["default"].createElement(link_1["default"], { href: "/", className: "inline-block" },
        react_1["default"].createElement("div", { className: utils_1.cn("relative overflow-hidden", "rounded-xl", "bg-slate-950 dark:bg-slate-900", "shadow-lg", "transition-transform duration-300") },
            react_1["default"].createElement(image_1["default"], { src: "/logo-facesearch.svg", alt: "FaceSearch AI Logo", width: 100, height: 100, className: "object-contain w-10 h-10" }))));
};
