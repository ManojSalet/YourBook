import Cart from "../models/Cart.js";
import Book from "../models/Book.js";

// Helper to format cartItems response
const formatCartResponse = (cart) => {
  if (!cart || !cart.items) return { cartItems: [] };
  const cartItems = cart.items
    .filter((item) => item.book)
    .map((item) => ({
      id: item._id ? item._id.toString() : item.id,
      book: item.book,
      quantity: item.quantity,
    }));
  return { cartItems };
};

// @desc    Get cart for user
// @route   GET /cart/:userId
// @access  Protected
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId }).populate({
      path: "items.book",
      populate: { path: "category", select: "name" },
    });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    return res.status(200).json(formatCartResponse(cart));
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// @desc    Add book to cart
// @route   POST /cart/:userId/add/:bookId
// @access  Protected
export const addToCart = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const quantity = parseInt(req.query.quantity) || 1;

    // Verify book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.book && item.book.toString() === bookId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ book: bookId, quantity });
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: "items.book",
      populate: { path: "category", select: "name" },
    });

    return res.status(200).json(formatCartResponse(populatedCart));
  } catch (error) {
    console.error("Add To Cart Error:", error);
    return res.status(500).json({ message: "Failed to add book to cart" });
  }
};

// @desc    Remove book from cart
// @route   DELETE /cart/:userId/remove/:bookId
// @access  Protected
export const removeFromCart = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(200).json({ cartItems: [] });
    }

    cart.items = cart.items.filter(
      (item) => item.book && item.book.toString() !== bookId
    );

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: "items.book",
      populate: { path: "category", select: "name" },
    });

    return res.status(200).json(formatCartResponse(populatedCart));
  } catch (error) {
    console.error("Remove From Cart Error:", error);
    return res.status(500).json({ message: "Failed to remove book from cart" });
  }
};

