import { getDB } from "../DB/connection.js";
import { ObjectId } from "mongodb";

// ====== Get all books ======
export const getBooks = async (req, res) => {
  try {
    const db = getDB();
    const books = await db.collection("books").find().toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====== Get book by ID ======
export const getBookById = async (req, res) => {
  try {
    const db = getDB();
    const book = await db.collection("books").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====== Create new book ======
export const createBook = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("books").insertOne(req.body);

    res.status(201).json({
      _id: result.insertedId,
      ...req.body,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====== Update book ======
export const updateBook = async (req, res) => {
  try {
    const db = getDB();

    const result = await db
      .collection("books")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnDocument: "after" },
      );

    if (!result.value)
      return res.status(404).json({ message: "Book not found" });

    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====== Delete book ======
export const deleteBook = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("books").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
