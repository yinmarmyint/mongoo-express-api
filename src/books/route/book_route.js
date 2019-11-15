const express = require("express");
const router = express.Router();
const Book = require("../model/Book");

async function getOneBook(req, res, next) {
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Cant find any books" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one book
router.get("/:id", getOneBook, (req, res) => {
  res.json(res.book);
});

// Create one book
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    publisher: req.body.publisher
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one book
router.put("/:id", getOneBook, async (req, res) => {
  console.log("req ====>", req.body);
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }

  if (req.body.author != null) {
    res.book.author = req.body.author;
  }

  if (req.body.numberOfPages != null) {
    res.book.numberOfPages = req.body.numberOfPages;
  }
  if (req.body.publisher != null) {
    res.book.publisher = req.body.publisher;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getOneBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: "Deleted This BOOK" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
