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
// import { fetchUserCredits } from "@/lib/redux/features/credits/creditsSlice";
// import { SignOutButton } from "@clerk/nextjs";
var lucide_react_1 = require("lucide-react");
var userSlice_1 = require("@/lib/redux/slices/userSlice");
var navigation_1 = require("next/navigation");
function SidebarDemo() {
    var _a;
    var dispatch = hooks_1.useAppDispatch();
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var user = hooks_1.useAppSelector(function (state) { return state.user; });
    var router = navigation_1.useRouter();
    // Use Redux state for user information
    // const { isVerified } = useAppSelector((state) => state.user);
    // useEffect(() => {
    //   dispatch(fetchUserCredits());
    // }, [dispatch]);
    var handleLogout = function () {
        dispatch(userSlice_1.clearUser());
        document.cookie = "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('user');
        router.push('/auth');
    };
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
        {
            label: "Logout",
            href: "#",
            icon: react_1["default"].createElement(icons_react_1.IconLogout, { className: "text-red-600 dark:text-red-400 h-5 w-5 flex-shrink-0" }),
            onClick: handleLogout
        }
    ];
    return (react_1["default"].createElement("div", { className: utils_1.cn("flex flex-col md:flex-row bg-[#cbd5e1] w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden", "h-full") },
        react_1["default"].createElement(sidebar_1.Sidebar, { open: open, setOpen: setOpen },
            react_1["default"].createElement(sidebar_1.SidebarBody, { className: "justify-between gap-10" },
                react_1["default"].createElement("div", { className: "flex flex-col flex-1 overflow-y-auto overflow-x-hidden" },
                    open ? react_1["default"].createElement(exports.Logo, null) : react_1["default"].createElement(exports.LogoIcon, null),
                    react_1["default"].createElement("div", { className: "mt-8 flex flex-col gap-2" }, links.map(function (link, idx) { return (react_1["default"].createElement(sidebar_1.SidebarLink, { key: idx, link: link, onClick: link.onClick })); }))),
                react_1["default"].createElement("div", { className: "px-3 py-4" }, user.id && (react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                    react_1["default"].createElement("div", { className: "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white" }, user.name
                        ? user.name.charAt(0).toUpperCase()
                        : (_a = user.email) === null || _a === void 0 ? void 0 : _a.charAt(0).toUpperCase()),
                    open && (react_1["default"].createElement(framer_motion_1.motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-sm font-medium text-gray-700 dark:text-gray-300" }, user.name || user.email)))))))));
}
exports.SidebarDemo = SidebarDemo;
// Logo components remain the same
exports.Logo = function () {
    return (react_1["default"].createElement(link_1["default"], { href: "#", className: "font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-50" },
        react_1["default"].createElement(image_1["default"], { src: "/logo-facesearch.svg", alt: "FaceSearch AI Logo", width: 40, height: 40, className: "object-contain" }),
        react_1["default"].createElement(framer_motion_1.motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "font-medium text-black dark:text-white whitespace-pre" }, "FaceSearch AI")));
};
exports.LogoIcon = function () {
    return (react_1["default"].createElement(link_1["default"], { href: "#", className: "font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-50" },
        react_1["default"].createElement(image_1["default"], { src: "/logo-facesearch.svg", alt: "FaceSearch AI Logo", width: 40, height: 40, className: "object-contain" })));
};
