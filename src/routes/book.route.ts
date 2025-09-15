import express from 'express';
import { createBook, getBooks, deleteBook, getUserBooks } from '../controllers/book.controller';
import { protectRoute } from '../middlewares/auth.middleware';


const router = express.Router();

router.get("/", getBooks);
router.post("/create", protectRoute, createBook);
router.post("/user", protectRoute, getUserBooks);
router.delete("/delete/:id", protectRoute, deleteBook);

export default router;