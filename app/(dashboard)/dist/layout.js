"use client";
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var sonner_1 = require("sonner");
var Sidebar_1 = require("@/components/Sidebar");
var redux_1 = require("@/lib/redux");
var DashboardLayout = function (_a) {
    var children = _a.children;
    var user = redux_1.useAppSelector(function (state) { return state.user; });
    var router = navigation_1.useRouter();
    var _b = react_1.useState(false), mounted = _b[0], setMounted = _b[1];
    react_1.useEffect(function () {
        setMounted(true);
    }, []);
    react_1.useEffect(function () {
        if (mounted && user.id === null) {
            // Check if we have a user in localStorage as backup
            var savedUser = localStorage.getItem('user');
            if (!savedUser) {
                sonner_1.toast.error("Please sign in to access the dashboard", {
                    position: "top-right",
                    duration: 3000
                });
                router.push("/sign-in");
            }
        }
    }, [user, router, mounted]);
    // Don't render anything until component is mounted
    if (!mounted) {
        return null;
    }
    // Show loading state while checking authentication
    if (user.id === null) {
        return (React.createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900" },
            React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent" })));
    }
    // If user is logged in, render the dashboard layout
    return (React.createElement("div", { className: "flex h-full" },
        React.createElement("div", { className: "w-1/7 h-full fixed z-10" },
            React.createElement(Sidebar_1.SidebarDemo, null)),
        React.createElement("div", { className: "relative w-full h-full lg:ml-16 md:ml-20 overflow-hidden" }, children)));
};
exports["default"] = DashboardLayout;
