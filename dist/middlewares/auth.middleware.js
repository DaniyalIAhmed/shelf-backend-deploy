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
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const utils_lib_1 = require("../libs/utils.lib");
const user_model_1 = require("../models/user.model");
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, No token provided" });
        }
        const decoded = (0, utils_lib_1.verifyToken)(token);
        const userId = typeof decoded === "string" ? decoded : decoded.id;
        if (!userId) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        const user = yield user_model_1.User.findById(userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
exports.protectRoute = protectRoute;
//# sourceMappingURL=auth.middleware.js.map