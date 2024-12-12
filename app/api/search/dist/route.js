"use strict";
// // In your route handler file (e.g., route.ts)
// import { ProcessedData } from "@/types/search";
// import { NextRequest, NextResponse } from "next/server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.POST = void 0;
var server_1 = require("next/server");
var headers_1 = require("next/headers");
function POST(request) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var authHeader, token, cookieStore, storedToken, body, image, adultFilter_1, processedData, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    authHeader = request.headers.get("authorization");
                    if (!authHeader || !authHeader.startsWith("Bearer ")) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Authentication required" }, { status: 401 })];
                    }
                    token = authHeader.split(" ")[1];
                    cookieStore = headers_1.cookies();
                    storedToken = (_a = cookieStore.get("access_token")) === null || _a === void 0 ? void 0 : _a.value;
                    if (!storedToken || token !== storedToken) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid authentication" }, { status: 401 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 1:
                    body = _c.sent();
                    image = body.image, adultFilter_1 = body.adultFilter;
                    if (!image) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Missing image" }, { status: 400 })];
                    }
                    processedData = {
                        status: "success",
                        user_email: "webtech076@gmail.com",
                        is_premium: false,
                        data: [
                            {
                                adultContent: true,
                                group: 0,
                                sourceUrl: "FacesearchAI",
                                imageUrl: "https://cdn.editorji.com/R215Cgr7fF.jpg"
                            },
                            {
                                adultContent: true,
                                group: 3,
                                sourceUrl: "FacesearchAI",
                                imageUrl: "https://www.pinkvilla.com/images/2023-11/1698880802_shah-rukh-khan-birthday-message.jpg"
                            },
                            {
                                adultContent: true,
                                group: 4,
                                sourceUrl: "FacesearchAI",
                                imageUrl: "https://cdn.manalokam.com/wp-content/uploads/2024/01/shahrukh-khan-421-1694248520.jpg"
                            },
                            {
                                adultContent: false,
                                group: 4,
                                sourceUrl: "FacesearchAI",
                                imageUrl: "https://www.iwmbuzz.com/wp-content/uploads/2023/07/when-shah-rukh-khan-said-he-finds-his-stardom-shocking-watch-throwback-video.jpg"
                            },
                            {
                                adultContent: false,
                                group: 4,
                                sourceUrl: "FacesearchAI",
                                imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/image-1200x900-2023-09-28t062044.328-2023-09-a164584397280386417f9cd9739f766a-3x2.png?impolicy=website&width=510&height=356"
                            },
                        ].filter(function (result) { return adultFilter_1 || !result.adultContent; })
                    };
                    return [2 /*return*/, server_1.NextResponse.json({
                            results: processedData.data,
                            sourceUrl: ((_b = processedData.data[0]) === null || _b === void 0 ? void 0 : _b.sourceUrl) || null
                        })];
                case 2:
                    error_1 = _c.sent();
                    console.error("Error processing image:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Failed to process image" }, { status: 500 })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
