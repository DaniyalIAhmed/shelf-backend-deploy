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
exports.getUserBooks = exports.deleteBook = exports.getBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const cloudinary_config_1 = require("../configs/cloudinary.config");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, caption, image, rating } = req.body;
        if (!title || !caption || !image || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const response = yield cloudinary_config_1.cloudinary.uploader.upload(image, {
            folder: "books",
            overwrite: true,
        });
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        const imageUrl = response.secure_url;
        const book = yield book_model_1.Book.create({ title, caption, image: imageUrl, rating, user: user._id });
        res.status(201).json({ book });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const books = yield book_model_1.Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("user", "name profileImage");
        const totalBooks = yield book_model_1.Book.countDocuments();
        res.status(200).json({ books, currentPage: page, totalPages: Math.ceil(totalBooks / limit) });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
exports.getBooks = getBooks;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const book = yield book_model_1.Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized: You are not the owner of this book" });
        }
        yield book_model_1.Book.findByIdAndDelete(id);
        yield cloudinary_config_1.cloudinary.uploader.destroy((_a = book.image.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0]);
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
exports.deleteBook = deleteBook;
const getUserBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const books = yield book_model_1.Book.find({ user: user._id });
        res.status(200).json({ books });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
exports.getUserBooks = getUserBooks;
//# sourceMappingURL=book.controller.js.map