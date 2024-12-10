"use client";
"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var card_1 = require("@/components/ui/card");
var images_1 = require("@/lib/images");
var image_1 = require("next/image");
var react_wrap_balancer_1 = require("react-wrap-balancer");
var react_vertical_timeline_component_1 = require("react-vertical-timeline-component");
require("react-vertical-timeline-component/style.min.css");
var lucide_react_1 = require("lucide-react");
var AboutUs = function () {
    return (React.createElement("div", { className: "min-h-full" },
        React.createElement(framer_motion_1.motion.div, { className: "text-center py-12 lg:h-[300px] md:h-[220px] text-black bg-blue-300/30 relative", initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1 } },
            React.createElement("h1", { className: "text-5xl font-bold" }, "About Us"),
            React.createElement("p", { className: "mt-4 text-lg" },
                React.createElement(react_wrap_balancer_1["default"], null, "At FaceSearchAI, we are transforming how the world interacts with facial recognition.")),
            React.createElement("div", { className: "container mx-auto px-6 md:px-12 py-8" },
                React.createElement(framer_motion_1.motion.div, { className: "grid grid-cols-2 md:grid-cols-4 gap-6", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 1 } }, images_1["default"].aboutUsImages.map(function (item) { return (React.createElement(card_1.Card, { key: item.id, className: "shadow-lg hover:shadow-xl bg-transparent border-none p-1" },
                    React.createElement(card_1.CardHeader, null,
                        React.createElement(image_1["default"], { src: item.image, width: 1000, height: 1000, alt: "About us image " + item.id, className: "rounded-lg w-full lg:h-[250px] h-[200px] md:[220px] object-cover" })))); })))),
        React.createElement("div", { className: "mx-auto pt-14 px-2 lg:mt-24 md:mt-24" },
            React.createElement(framer_motion_1.motion.div, { className: "pt-8 relative", initial: "hidden", whileInView: "visible", viewport: { once: true }, transition: { duration: 1 }, variants: {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                } },
                React.createElement("div", { className: "container mx-auto px-6 md:px-12 text-center" },
                    React.createElement("h2", { className: "text-4xl font-bold text-gray-800" }, "Why Choose Us?"),
                    React.createElement("p", { className: "mt-4 text-gray-600 max-w-2xl mx-auto" },
                        React.createElement(react_wrap_balancer_1["default"], null, "FaceSearchAI combines innovation, security, and affordability to deliver a seamless experience for all users.")),
                    React.createElement("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto" },
                        React.createElement(framer_motion_1.motion.div, { className: "p-8 bg-blue-50 rounded-lg shadow-lg flex flex-col", whileHover: { scale: 1.02 } },
                            React.createElement("h3", { className: "text-xl font-bold text-gray-700 mb-4" }, "Tailored AI-Driven Searches"),
                            React.createElement("p", { className: "text-gray-600 flex-grow" }, "Our cutting-edge AI models are optimized for various categories, including faces, objects, and similar visuals, ensuring every search delivers highly relevant results. Whether you're looking to trace an image source or find connections across the web, our platform adapts to your needs effortlessly.")),
                        React.createElement(framer_motion_1.motion.div, { className: "p-8 bg-purple-50 rounded-lg shadow-lg flex flex-col", whileHover: { scale: 1.02 } },
                            React.createElement("h3", { className: "text-xl font-bold text-gray-700 mb-4" }, "Facial Recognition Precision"),
                            React.createElement("p", { className: "text-gray-600 flex-grow" }, "Discover where your face or others appear online with unmatched accuracy. Our facial recognition technology identifies subtle details and matches them precisely, providing actionable results. Note: Facial recognition is subject to regional availability for compliance and privacy.")),
                        React.createElement(framer_motion_1.motion.div, { className: "p-8 bg-green-50 rounded-lg shadow-lg flex flex-col", whileHover: { scale: 1.02 } },
                            React.createElement("h3", { className: "text-xl font-bold text-gray-700 mb-4" }, "Image Ownership and Credibility"),
                            React.createElement("p", { className: "text-gray-600 flex-grow" }, "Empower yourself with tools to locate original image sources, protect copyrights, and trace duplicates. Our platform helps you verify ownership and ensure proper attribution, offering peace of mind in an increasingly digital world.")),
                        React.createElement(framer_motion_1.motion.div, { className: "p-8 bg-rose-50 rounded-lg shadow-lg flex flex-col", whileHover: { scale: 1.02 } },
                            React.createElement("h3", { className: "text-xl font-bold text-gray-700 mb-4" }, "Advanced Privacy Protection"),
                            React.createElement("p", { className: "text-gray-600 flex-grow" }, "Your privacy is our priority. We implement state-of-the-art encryption and security measures to protect your searches and personal data. Our platform complies with global privacy standards while delivering powerful search capabilities.")))))),
        React.createElement("div", { className: "container mx-auto py-16 px-2 md:px-12" },
            React.createElement(framer_motion_1.motion.div, { className: "text-center mb-12", initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } },
                React.createElement("h2", { className: "text-4xl font-bold text-gray-800 mb-4" }, "How It Works"),
                React.createElement("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto" },
                    React.createElement(react_wrap_balancer_1["default"], null, "Discover the seamless process of our advanced facial recognition technology, designed to make image searching effortless and precise."))),
            React.createElement(framer_motion_1.motion.div, { className: "flex flex-col lg:flex-row gap-8 justify-center", initial: "hidden", whileInView: "visible", viewport: { once: true }, transition: { duration: 1 }, variants: {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                } },
                React.createElement("div", { className: "w-full lg:w-1/2" },
                    React.createElement(react_vertical_timeline_component_1.VerticalTimeline, { layout: "1-column-left" },
                        React.createElement(react_vertical_timeline_component_1.VerticalTimelineElement, { className: "vertical-timeline-element--work", contentStyle: {
                                background: "rgb(249, 250, 251)",
                                color: "#4B5563"
                            }, contentArrowStyle: {
                                borderRight: "7px solid  rgb(249, 250, 251)"
                            }, date: "Step 1", iconStyle: { background: "rgb(33, 150, 243)", color: "#fff" }, icon: React.createElement(lucide_react_1.Upload, null) },
                            React.createElement("h3", { className: "vertical-timeline-element-title font-bold text-gray-700" }, "Upload Your Image"),
                            React.createElement("p", null, "Begin your search by uploading the image you want to investigate. Our platform supports various image formats and ensures a smooth, user-friendly upload process.")),
                        React.createElement(react_vertical_timeline_component_1.VerticalTimelineElement, { className: "vertical-timeline-element--work", contentStyle: {
                                background: "rgb(249, 250, 251)",
                                color: "#4B5563"
                            }, contentArrowStyle: {
                                borderRight: "7px solid  rgb(249, 250, 251)"
                            }, date: "Step 2", iconStyle: { background: "rgb(233, 30, 99)", color: "#fff" }, icon: React.createElement(lucide_react_1.Search, null) },
                            React.createElement("h3", { className: "vertical-timeline-element-title font-bold text-gray-700" }, "Internet-Wide Search"),
                            React.createElement("p", null, "Our advanced AI scans billions of images across the internet, using sophisticated algorithms to find potential matches and related visual content with unprecedented speed and accuracy.")),
                        React.createElement(react_vertical_timeline_component_1.VerticalTimelineElement, { className: "vertical-timeline-element--work", contentStyle: {
                                background: "rgb(249, 250, 251)",
                                color: "#4B5563"
                            }, contentArrowStyle: {
                                borderRight: "7px solid  rgb(249, 250, 251)"
                            }, date: "Step 3", iconStyle: { background: "rgb(76, 175, 80)", color: "#fff" }, icon: React.createElement(lucide_react_1.ImageIcon, null) },
                            React.createElement("h3", { className: "vertical-timeline-element-title font-bold text-gray-700" }, "Comprehensive Results"),
                            React.createElement("p", null, "Receive a detailed report of similar images, their sources, and potential connections. Filter and analyze results with our intuitive interface designed for maximum insights.")))),
                React.createElement("div", { className: "w-full lg:w-1/2" },
                    React.createElement(react_vertical_timeline_component_1.VerticalTimeline, { layout: "1-column-left" },
                        React.createElement(react_vertical_timeline_component_1.VerticalTimelineElement, { className: "vertical-timeline-element--work", contentStyle: {
                                background: "rgb(249, 250, 251)",
                                color: "#4B5563"
                            }, contentArrowStyle: {
                                borderRight: "7px solid  rgb(249, 250, 251)"
                            }, date: "Advanced AI", iconStyle: { background: "rgb(33, 150, 243)", color: "#fff" }, icon: React.createElement(lucide_react_1.Target, null) },
                            React.createElement("h3", { className: "vertical-timeline-element-title font-bold text-gray-700" }, "Image Feature Extraction"),
                            React.createElement("p", null, "Our AI breaks down the uploaded image into unique digital fingerprints, analyzing color patterns, facial landmarks, and complex visual characteristics with machine learning algorithms.")),
                        React.createElement(react_vertical_timeline_component_1.VerticalTimelineElement, { className: "vertical-timeline-element--work", contentStyle: {
                                background: "rgb(249, 250, 251)",
                                color: "#4B5563"
                            }, contentArrowStyle: {
                                borderRight: "7px solid  rgb(249, 250, 251)"
                            }, date: "Global Network", iconStyle: { background: "rgb(233, 30, 99)", color: "#fff" }, icon: React.createElement(lucide_react_1.Globe, null) },
                            React.createElement("h3", { className: "vertical-timeline-element-title font-bold text-gray-700" }, "Distributed Search Architecture"),
                            React.createElement("p", null, "Leveraging a global network of servers, we simultaneously search multiple databases and image repositories, ensuring comprehensive and rapid result generation.")),
                        React.createElement(react_vertical_timeline_component_1.VerticalTimelineElement, { className: "vertical-timeline-element--work", contentStyle: {
                                background: "rgb(249, 250, 251)",
                                color: "#4B5563"
                            }, contentArrowStyle: {
                                borderRight: "7px solid  rgb(249, 250, 251)"
                            }, date: "Security First", iconStyle: { background: "rgb(76, 175, 80)", color: "#fff" }, icon: React.createElement(lucide_react_1.Shield, null) },
                            React.createElement("h3", { className: "vertical-timeline-element-title font-bold text-gray-700" }, "Privacy and Verification"),
                            React.createElement("p", null, "We implement advanced encryption and privacy protocols, ensuring data anonymization and providing transparent verification of image sources and ownership."))))))));
};
exports["default"] = AboutUs;
