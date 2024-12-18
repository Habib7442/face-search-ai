"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.SidebarLink = exports.MobileSidebar = exports.DesktopSidebar = exports.SidebarBody = exports.Sidebar = exports.SidebarProvider = exports.useSidebar = void 0;
var utils_1 = require("@/lib/utils");
var link_1 = require("next/link");
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var SidebarContext = react_1.createContext(undefined);
exports.useSidebar = function () {
    var context = react_1.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
exports.SidebarProvider = function (_a) {
    var children = _a.children, openProp = _a.open, setOpenProp = _a.setOpen, _b = _a.animate, animate = _b === void 0 ? true : _b;
    var _c = react_1.useState(false), openState = _c[0], setOpenState = _c[1];
    var open = openProp !== null && openProp !== void 0 ? openProp : openState;
    var setOpen = setOpenProp !== null && setOpenProp !== void 0 ? setOpenProp : setOpenState;
    return (react_1["default"].createElement(SidebarContext.Provider, { value: { open: open, setOpen: setOpen, animate: animate } }, children));
};
exports.Sidebar = function (_a) {
    var children = _a.children, open = _a.open, setOpen = _a.setOpen, animate = _a.animate;
    return (react_1["default"].createElement(exports.SidebarProvider, { open: open, setOpen: setOpen, animate: animate }, children));
};
exports.SidebarBody = function (props) {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(exports.DesktopSidebar, __assign({}, props)),
        react_1["default"].createElement(exports.MobileSidebar, __assign({}, props))));
};
exports.DesktopSidebar = function (_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    var _b = exports.useSidebar(), open = _b.open, setOpen = _b.setOpen, animate = _b.animate;
    return (react_1["default"].createElement("div", { className: "relative hidden md:block" },
        react_1["default"].createElement(framer_motion_1.motion.div, __assign({ className: utils_1.cn("h-full px-4 py-6 flex flex-col bg-white/80 backdrop-blur-sm shadow-lg", "border-r border-slate-200/50", className), animate: {
                width: animate ? (open ? "280px" : "80px") : "280px"
            } }, props),
            children,
            react_1["default"].createElement("button", { onClick: function () { return setOpen(!open); }, className: "absolute -right-4 top-8 p-1.5 rounded-full bg-white shadow-md border border-slate-200/50" }, open ? (react_1["default"].createElement(lucide_react_1.ChevronLeft, { className: "h-4 w-4 text-slate-600" })) : (react_1["default"].createElement(lucide_react_1.ChevronRight, { className: "h-4 w-4 text-slate-600" }))))));
};
exports.MobileSidebar = function (_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    var _b = exports.useSidebar(), open = _b.open, setOpen = _b.setOpen;
    return (react_1["default"].createElement("div", { className: "md:hidden" },
        react_1["default"].createElement("button", { onClick: function () { return setOpen(true); }, className: "fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg" },
            react_1["default"].createElement(lucide_react_1.Menu, { className: "h-5 w-5 text-slate-600" })),
        react_1["default"].createElement(framer_motion_1.AnimatePresence, null, open && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: function () { return setOpen(false); }, className: "fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" }),
            react_1["default"].createElement(framer_motion_1.motion.div, __assign({ initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" }, transition: { type: "spring", damping: 20, stiffness: 300 }, className: utils_1.cn("fixed inset-y-0 left-0 w-[280px] z-50", "bg-white/90 backdrop-blur-md shadow-xl", "p-6 flex flex-col", className) }, props),
                react_1["default"].createElement("button", { onClick: function () { return setOpen(false); }, className: "absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100" },
                    react_1["default"].createElement(lucide_react_1.X, { className: "h-5 w-5 text-slate-600" })),
                children))))));
};
exports.SidebarLink = function (_a) {
    var link = _a.link, className = _a.className, onClick = _a.onClick, props = __rest(_a, ["link", "className", "onClick"]);
    var _b = exports.useSidebar(), open = _b.open, animate = _b.animate;
    var content = (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "p-2 rounded-lg bg-slate-100/50" }, link.icon),
        react_1["default"].createElement(framer_motion_1.motion.span, { animate: {
                display: animate ? (open ? "inline-block" : "none") : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1
            }, className: "text-sm font-medium whitespace-pre" }, link.label)));
    var sharedClasses = utils_1.cn("flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200", "hover:bg-slate-100", className);
    if (link.onClick || onClick) {
        return (react_1["default"].createElement("button", { onClick: link.onClick || onClick, className: utils_1.cn(sharedClasses, "w-full text-left") }, content));
    }
    return (react_1["default"].createElement(link_1["default"], __assign({ href: link.href, className: sharedClasses }, props), content));
};
