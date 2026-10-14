import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:userId", protect, getCart);
router.post("/:userId/add/:bookId", protect, addToCart);
router.delete("/:userId/remove/:bookId", protect, removeFromCart);

export default router;

