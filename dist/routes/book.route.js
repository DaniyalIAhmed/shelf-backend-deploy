"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/", book_controller_1.getBooks);
router.post("/create", auth_middleware_1.protectRoute, book_controller_1.createBook);
router.post("/user", auth_middleware_1.protectRoute, book_controller_1.getUserBooks);
router.delete("/delete/:id", auth_middleware_1.protectRoute, book_controller_1.deleteBook);
exports.default = router;
//# sourceMappingURL=book.route.js.map