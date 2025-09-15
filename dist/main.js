"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const cors_1 = __importDefault(require("cors"));
const db_config_1 = require("./configs/db.config");
//Config
dotenv_1.default.config();
//Constants
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
//Routes
app.use(`/api/${process.env.API_VERSION || "v1"}/auth`, auth_route_1.default);
app.use(`/api/${process.env.API_VERSION || "v1"}/book`, book_route_1.default);
//Server Start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    (0, db_config_1.connectDB)();
});
//# sourceMappingURL=main.js.map