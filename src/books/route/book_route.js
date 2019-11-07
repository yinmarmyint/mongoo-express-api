const express = require("express");
const router = express.Router();
const Book = require("../model/Book");

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
router.get("/:id", (req, res) => {});

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
router.patch("/:id", (req, res) => {});
// Delete one book
router.delete("/:id", (req, res) => {
  try {
    Book.findOneAndDelete({ _id: req.params.id });
    res.status(203);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
