import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { cloudinary } from "../configs/cloudinary.config";

export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, caption, image, rating } = req.body;
        if (!title || !caption || !image || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const response = await cloudinary.uploader.upload(image, {
            folder: "books",
            overwrite: true,
        });

        const user = (req as any).user;
        if (!user || !user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        const imageUrl = response.secure_url;
        const book = await Book.create({ title, caption, image: imageUrl, rating, user: user._id });
        res.status(201).json({ book });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const getBooks = async (req:Request, res:Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = (page - 1) * limit;
        const books = await Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("user", "name profileImage");
        const totalBooks = await Book.countDocuments();
        res.status(200).json({ books, currentPage: page, totalPages: Math.ceil(totalBooks / limit) });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const deleteBook = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        }
        if(book.user.toString() !== (req as any).user._id.toString()){
            return res.status(401).json({ message: "Unauthorized: You are not the owner of this book" });
        }
        await Book.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(book.image.split("/").pop()?.split(".")[0] as string);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

export const getUserBooks = async (req:Request, res:Response) => {
    try {
        const user = (req as any).user;
        const books = await Book.find({ user: user._id });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}