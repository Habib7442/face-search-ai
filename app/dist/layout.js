"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var local_1 = require("next/font/local");
require("./globals.css");
var nextjs_1 = require("@clerk/nextjs");
var sonner_1 = require("@/components/ui/sonner");
var provider_1 = require("./provider");
var lenis_1 = require("@/lib/lenis");
var ReduxProvider_1 = require("./ReduxProvider");
var geistSans = local_1["default"]({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900"
});
var geistMono = local_1["default"]({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900"
});
exports.metadata = {
    title: "Facesearch AI",
    description: "FaceSearchAI delivers premium facial recognition services within budget constraints, ensuring accessibility for everyone"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", suppressHydrationWarning: true },
        React.createElement(lenis_1.ReactLenis, { root: true },
            React.createElement("body", { className: geistSans.variable + " " + geistMono.variable + " antialiased relative bg-gradient-to-b from-lightBlue to-white text-gray-800" },
                React.createElement(provider_1.ThemeProvider, { attribute: "class", defaultTheme: "dark", enableSystem: true, disableTransitionOnChange: true },
                    React.createElement(nextjs_1.ClerkProvider, null,
                        React.createElement(ReduxProvider_1.Providers, null,
                            React.createElement("main", { className: "relative" },
                                React.createElement("div", { className: "absolute inset-0 -z-10 bg-cover bg-center opacity-5", style: {
                                        backgroundImage: "url('/water-bubble.png')"
                                    } }),
                                children)),
                        React.createElement(sonner_1.Toaster, null)))))));
}
exports["default"] = RootLayout;
