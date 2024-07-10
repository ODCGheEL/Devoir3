const cloudinary = require("../config/cloudinary");
// controllers/userController.js
const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    const book = new Book({ title, description });
    if (req.file) {
      book.imageUrl = req.file.path;
      book.imageId = req.file.filename;
      //   console.log("image id:", book.imageId);
    }
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id)
    if(!book) return res.status(404).json({ error: "Book not found" });
    return res.status(200).json(book);
  }catch(error){
    res.status(400).json({ error: error.message });
  }
}

exports.getAllBooks = async (req, res) => {
  try {
    const users = await Book.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("data", title, description);
    let updateFields = {};

    if (req.file) {
      // Delete previous image from Cloudinary if it exists
      const book = await Book.findById(req.params.id);
      if (book.imageId) {
        await cloudinary.uploader.destroy(book.imageId);
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        imageUrl: req.file.path,
        imageId: req.file.filename,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Delete image from Cloudinary if it exists
    if (book.imageId) {
      await cloudinary.uploader.destroy(book.imageId);
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
