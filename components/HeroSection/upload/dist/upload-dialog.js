"use strict";
exports.__esModule = true;
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var lucide_react_1 = require("lucide-react");
var navigation_1 = require("next/navigation");
var image_1 = require("next/image");
var sonner_1 = require("sonner");
var UploadDialog = function () {
    var _a = react_1.useState(false), isDialogOpen = _a[0], setDialogOpen = _a[1];
    var _b = react_1.useState(null), uploadedImage = _b[0], setUploadedImage = _b[1];
    var _c = react_1.useState(0), progress = _c[0], setProgress = _c[1];
    var router = navigation_1.useRouter();
    var handleImageUpload = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                setUploadedImage(reader_1.result);
                setDialogOpen(true);
                simulateProgress();
            };
            reader_1.readAsDataURL(file);
        }
    };
    var simulateProgress = function () {
        setProgress(0);
        var interval = setInterval(function () {
            setProgress(function (prev) {
                if (prev >= 100) {
                    clearInterval(interval);
                    try {
                        if (uploadedImage) {
                            localStorage.setItem("uploadedImage", uploadedImage);
                        }
                        setTimeout(function () {
                            router.push("/upload");
                        }, 500);
                    }
                    catch (error) {
                        sonner_1.toast.error("Error saving image", {
                            description: "Please try again with a smaller image.",
                            duration: 4000
                        });
                    }
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
    };
    return (React.createElement("div", null,
        React.createElement("label", { className: "cursor-pointer" },
            React.createElement("div", { className: "px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center drop-shadow-xl" },
                "Upload Image",
                React.createElement(lucide_react_1.ImageIcon, { className: "ml-2 text-slate-800 drop-shadow-lg" })),
            React.createElement("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleImageUpload })),
        React.createElement(dialog_1.Dialog, { open: isDialogOpen, onOpenChange: function () { return setDialogOpen(false); } },
            React.createElement(dialog_1.DialogContent, { className: "max-w-4xl p-6 bg-gradient-to-b from-[#ccf4e6] to-white" },
                React.createElement(dialog_1.DialogHeader, null,
                    React.createElement(dialog_1.DialogTitle, { className: "text-2xl font-bold text-gray-800" }, "Processing Your Image")),
                React.createElement("div", { className: "mt-6 space-y-6" },
                    uploadedImage && (React.createElement("div", { className: "relative h-64 rounded-lg overflow-hidden" },
                        React.createElement(image_1["default"], { src: uploadedImage, alt: "Uploaded preview", layout: "fill", objectFit: "contain", className: "rounded-lg" }))),
                    React.createElement("div", { className: "w-full bg-gray-200 rounded-full h-2.5" },
                        React.createElement("div", { className: "bg-blue-600 h-2.5 rounded-full transition-all duration-300", style: { width: progress + "%" } })),
                    React.createElement("p", { className: "text-center text-gray-600" },
                        "Processing... ",
                        progress,
                        "%"))))));
};
exports["default"] = UploadDialog;
