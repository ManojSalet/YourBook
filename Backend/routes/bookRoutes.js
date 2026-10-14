import express from "express";
import {
  getBooks,
  getBooksByCategory,
  getBookById,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/category/:name", getBooksByCategory);
router.get("/:id", getBookById);

export default router;

