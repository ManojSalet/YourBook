import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Book from "../models/Book.js";

// @desc    Place a new order
// @route   POST /orders/:userId
// @access  Protected
export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided for order" });
    }

    // Map order items to schema
    const formattedItems = items.map((item) => ({
      book: item.book?.id || item.book || item.bookId,
      quantity: item.quantity || 1,
      priceAtPurchase: item.priceAtPurchase || item.price || 0,
    }));

    const order = await Order.create({
      userId,
      items: formattedItems,
      totalPrice: Number(totalPrice) || 0,
      status: "PROCESSING",
    });

    // Clear user cart upon successful order
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    const populatedOrder = await Order.findById(order._id).populate({
      path: "items.book",
      select: "title price imageUrl image author",
    });

    return res.status(201).json(populatedOrder);
  } catch (error) {
    console.error("Place Order Error:", error);
    return res.status(500).json({ message: error.message || "Failed to place order" });
  }
};

// @desc    Get orders for specific user
// @route   GET /orders/:userId
// @access  Protected
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate({
        path: "items.book",
        select: "title price imageUrl image author",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get User Orders Error:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// @desc    Cancel/Delete user order
// @route   DELETE /orders/:orderId
// @access  Protected
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    return res.status(500).json({ message: "Failed to cancel order" });
  }
};

// @desc    Get all orders for admin
// @route   GET /admin/orders
// @access  Admin
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.book",
        select: "title price imageUrl image author",
      })
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(204).json([]);
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get Admin Orders Error:", error);
    return res.status(500).json({ message: "Failed to fetch admin orders" });
  }
};

// @desc    Delete/Cancel order as admin
// @route   DELETE /admin/orders/:orderId
// @access  Admin
export const deleteOrderAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ message: "Order removed by admin" });
  } catch (error) {
    console.error("Admin Delete Order Error:", error);
    return res.status(500).json({ message: "Failed to delete order" });
  }
};

