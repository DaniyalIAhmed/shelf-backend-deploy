import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import bookRoutes from "./routes/book.route";
import cors from "cors";
import { connectDB } from "./configs/db.config";

//Config
dotenv.config();

//Constants
const port = process.env.PORT || 3000;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Routes
app.use(`/api/${process.env.API_VERSION||"v1"}/auth`, authRoutes);
app.use(`/api/${process.env.API_VERSION||"v1"}/book`, bookRoutes);

//Server Start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});