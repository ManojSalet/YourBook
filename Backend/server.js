import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "📚 YourBook REST API is running",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: `API Endpoint Not Found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 YourBook Server is running on http://localhost:${PORT}`);
});

