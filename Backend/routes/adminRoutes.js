import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import {
  getAllOrdersAdmin,
  deleteOrderAdmin,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply auth to admin routes
router.use(protect);
router.use(adminOnly);

// Books Management
router.get("/books", getBooks);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

// Category Management
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// Orders Management
router.get("/orders", getAllOrdersAdmin);
router.delete("/orders/:orderId", deleteOrderAdmin);

export default router;

