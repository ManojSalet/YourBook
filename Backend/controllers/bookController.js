import Book from "../models/Book.js";
import Category from "../models/Category.js";

// @desc    Get all books
// @route   GET /books, GET /admin/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("category", "name description").sort({ createdAt: -1 });
    return res.status(200).json(books);
  } catch (error) {
    console.error("Get Books Error:", error);
    return res.status(500).json({ message: "Failed to fetch books" });
  }
};

// @desc    Get books by category name
// @route   GET /books/category/:name
// @access  Public
export const getBooksByCategory = async (req, res) => {
  try {
    const categoryName = req.params.name;
    const category = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    if (!category) {
      return res.status(200).json([]);
    }

    const books = await Book.find({ category: category._id })
      .populate("category", "name description")
      .sort({ createdAt: -1 });

    return res.status(200).json(books);
  } catch (error) {
    console.error("Get Books by Category Error:", error);
    return res.status(500).json({ message: "Failed to fetch books for category" });
  }
};

// @desc    Get book by ID
// @route   GET /books/:id
// @access  Public
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("category", "name description");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.error("Get Book By ID Error:", error);
    return res.status(500).json({ message: "Failed to fetch book" });
  }
};

// @desc    Create book
// @route   POST /admin/books
// @access  Admin
export const createBook = async (req, res) => {
  try {
    const { title, author, description, price, stockQuantity, imageUrl, imageBase64, categoryId } = req.body;

    if (!title || !author || !price) {
      return res.status(400).json({ message: "Title, author, and price are required" });
    }

    // Determine category
    let resolvedCategory = categoryId;
    if (!resolvedCategory) {
      // Find default category
      const firstCat = await Category.findOne();
      if (firstCat) resolvedCategory = firstCat._id;
    }

    const book = await Book.create({
      title,
      author,
      description: description || "",
      price: Number(price),
      stockQuantity: stockQuantity ? Number(stockQuantity) : 10,
      imageUrl: imageUrl || imageBase64 || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
      category: resolvedCategory,
    });

    const populatedBook = await Book.findById(book._id).populate("category", "name description");
    return res.status(201).json(populatedBook);
  } catch (error) {
    console.error("Create Book Error:", error);
    return res.status(500).json({ message: error.message || "Failed to create book" });
  }
};

// @desc    Update book
// @route   PUT /admin/books/:id
// @access  Admin
export const updateBook = async (req, res) => {
  try {
    const { title, author, description, price, stockQuantity, imageUrl, categoryId } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (description !== undefined) book.description = description;
    if (price !== undefined) book.price = Number(price);
    if (stockQuantity !== undefined) book.stockQuantity = Number(stockQuantity);
    if (imageUrl) book.imageUrl = imageUrl;
    if (categoryId) book.category = categoryId;

    await book.save();
    const updatedBook = await Book.findById(book._id).populate("category", "name description");
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Update Book Error:", error);
    return res.status(500).json({ message: "Failed to update book" });
  }
};

// @desc    Delete book
// @route   DELETE /admin/books/:id
// @access  Admin
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Book Error:", error);
    return res.status(500).json({ message: "Failed to delete book" });
  }
};

