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
exports.logout = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const utils_lib_1 = require("../libs/utils.lib");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const userExists = yield user_model_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${email.toLowerCase().split("@")[0]}`;
        const user = yield user_model_1.User.create({ name, email, password, profileImage });
        const token = (0, utils_lib_1.generateToken)(user._id.toString());
        // const refreshToken = generateRefreshToken(user._id);
        res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, createdAt: user.createdAt } });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!(yield (0, utils_lib_1.comparePassword)(password, user.password))) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = (0, utils_lib_1.generateToken)(user._id.toString());
        res.status(200).json({ token, user: { _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, createdAt: user.createdAt } });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield user_model_1.User.create({ name, email, password });
    res.status(201).json({ user });
});
exports.logout = logout;
//# sourceMappingURL=user.controller.js.map