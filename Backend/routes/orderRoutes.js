import express from "express";
import {
  placeOrder,
  getUserOrders,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:userId", protect, placeOrder);
router.get("/:userId", protect, getUserOrders);
router.delete("/:orderId", protect, cancelOrder);

export default router;

