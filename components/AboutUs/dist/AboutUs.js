"use client";
"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
var stats = [
    {
        icon: React.createElement(lucide_react_1.Users, { className: "w-6 h-6" }),
        value: "10M+",
        label: "Active Users"
    },
    {
        icon: React.createElement(lucide_react_1.Shield, { className: "w-6 h-6" }),
        value: "99.9%",
        label: "Security Score"
    },
    {
        icon: React.createElement(lucide_react_1.Target, { className: "w-6 h-6" }),
        value: "95%",
        label: "Accuracy Rate"
    },
    {
        icon: React.createElement(lucide_react_1.Award, { className: "w-6 h-6" }),
        value: "#1",
        label: "Rated Platform"
    },
];
var features = [
    {
        title: "Advanced AI Technology",
        description: "Our cutting-edge facial recognition algorithms provide unmatched accuracy and speed in identifying and matching faces."
    },
    {
        title: "Privacy First",
        description: "We prioritize user privacy with end-to-end encryption and strict data protection protocols that exceed industry standards."
    },
    {
        title: "Global Database",
        description: "Access to an extensive, constantly updated database of images while maintaining complete compliance with privacy regulations."
    },
];
function AboutUs() {
    return (React.createElement("section", { className: "py-24 relative overflow-hidden bg-light-background dark:bg-dark-background" },
        React.createElement("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:opacity-50" }),
        React.createElement("div", { className: "container mx-auto px-4 relative" },
            React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, className: "text-center max-w-3xl mx-auto mb-16" },
                React.createElement("h2", { className: "text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-blue-200 mb-4" }, "Revolutionizing Face Search Technology"),
                React.createElement("p", { className: "text-lg text-slate-600 dark:text-blue-100" }, "At FaceSearch AI, we combine cutting-edge technology with unwavering privacy protection to deliver the most accurate and secure facial recognition platform.")),
            React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" }, stats.map(function (stat, index) { return (React.createElement(framer_motion_1.motion.div, { key: stat.label, initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.1 }, className: "group relative bg-white dark:bg-[#0c1222]/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/[0.2] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl" },
                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20 dark:from-white/[0.02] dark:via-transparent dark:to-white/[0.02] group-hover:opacity-100 opacity-0 transition-opacity duration-300" }),
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { className: "flex justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" }, stat.icon),
                    React.createElement("div", { className: "text-3xl flex justify-center font-bold text-slate-800 dark:text-white mb-2" }, stat.value),
                    React.createElement("div", { className: "text-sm flex justify-center text-slate-600 dark:text-blue-200/80" }, stat.label)))); })),
            React.createElement("div", { className: "grid md:grid-cols-2 gap-12 items-center" },
                React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, className: "relative" },
                    React.createElement("div", { className: "aspect-square relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-white/[0.1]" },
                        React.createElement(image_1["default"], { src: "/about-us/image3.jpg", alt: "FaceSearch AI Technology", fill: true, className: "object-cover" }),
                        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" })),
                    React.createElement("div", { className: "absolute -bottom-8 -right-8 w-48 h-48 bg-blue-600/20 dark:bg-blue-400/10 rounded-full blur-3xl" }),
                    React.createElement("div", { className: "absolute -top-8 -left-8 w-48 h-48 bg-indigo-600/20 dark:bg-indigo-400/10 rounded-full blur-3xl" })),
                React.createElement("div", { className: "space-y-6" }, features.map(function (feature, index) { return (React.createElement(framer_motion_1.motion.div, { key: feature.title, initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.1 }, className: "group relative bg-white dark:bg-[#0c1222]/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/[0.2] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl" },
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20 dark:from-white/[0.02] dark:via-transparent dark:to-white/[0.02] group-hover:opacity-100 opacity-0 transition-opacity duration-300" }),
                    React.createElement("div", { className: "relative" },
                        React.createElement("h3", { className: "text-xl font-semibold text-slate-800 dark:text-white mb-3" }, feature.title),
                        React.createElement("p", { className: "text-slate-600 dark:text-blue-100/80 leading-relaxed" }, feature.description)))); }))))));
}
exports["default"] = AboutUs;
