import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/book.controller.js";

const router = express.Router();



// GET all books
router.get("/", getBooks);

// GET book by ID
router.get("/:id", getBookById);

// POST new book
router.post("/", createBook);

// PUT update book by ID
router.put("/:id", updateBook);

// DELETE book by ID
router.delete("/:id", deleteBook);

export default router;
