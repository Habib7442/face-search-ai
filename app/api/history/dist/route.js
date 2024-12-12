"use strict";
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
exports.GET = void 0;
var server_1 = require("next/server");
var headers_1 = require("next/headers");
var PREMIUM_USERS = ["premium@example.com"];
var mockHistoryData = {
    id: "4ac2cb8e-3f10-4167-98de-e26051ab2311",
    query: "https://cdn.editorji.com/R215Cgr7fF.jpg",
    result_count: 212,
    timestamp: "2024-12-12T09:57:22.115346",
    platform: "web",
    search_results: [
        {
            adultContent: false,
            group: 0,
            sourceUrl: "FacesearchAI",
            imageUrl: "https://cdn.editorji.com/R215Cgr7fF.jpg"
        },
        {
            adultContent: false,
            group: 2,
            sourceUrl: "FacesearchAI",
            imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/shah-rukh-khan-bollywood-169389292816x9.jpg"
        },
        {
            adultContent: false,
            group: 3,
            sourceUrl: "FacesearchAI",
            imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883-16940928653x2.jpg"
        },
        {
            adultContent: true,
            group: 3,
            sourceUrl: "FacesearchAI",
            imageUrl: "https://www.pinkvilla.com/images/2023-11/1698880802_shah-rukh-khan-birthday-message.jpg"
        },
        {
            adultContent: false,
            group: 3,
            sourceUrl: "FacesearchAI",
            imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883-16940928653x2.jpg"
        },
        {
            adultContent: false,
            group: 4,
            sourceUrl: "FacesearchAI",
            imageUrl: "https://images.news18.com/ibnlive/uploads/2023/09/fotojet-2023-09-07t185044.883.jpg"
        },
    ]
};
function GET(request) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var authHeader, token, cookieStore, storedToken, searchParams, email;
        return __generator(this, function (_b) {
            try {
                authHeader = request.headers.get('authorization');
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Authentication required" }, { status: 401 })];
                }
                token = authHeader.split(' ')[1];
                cookieStore = headers_1.cookies();
                storedToken = (_a = cookieStore.get('access_token')) === null || _a === void 0 ? void 0 : _a.value;
                if (!storedToken || token !== storedToken) {
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Invalid authentication" }, { status: 401 })];
                }
                searchParams = new URL(request.url).searchParams;
                email = searchParams.get("email");
                if (!email) {
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Email is required" }, { status: 400 })];
                }
                if (!PREMIUM_USERS.includes(email)) {
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Premium access required" }, { status: 403 })];
                }
                return [2 /*return*/, server_1.NextResponse.json(mockHistoryData, { status: 200 })];
            }
            catch (error) {
                return [2 /*return*/, server_1.NextResponse.json({ message: "Internal server error" }, { status: 500 })];
            }
            return [2 /*return*/];
        });
    });
}
exports.GET = GET;
