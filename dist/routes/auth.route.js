"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/register", user_controller_1.register);
authRoutes.post("/login", user_controller_1.login);
authRoutes.post("/logout", user_controller_1.logout);
exports.default = authRoutes;
//# sourceMappingURL=auth.route.js.map