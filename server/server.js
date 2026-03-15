import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from 'dns';

// Fix for some DNS resolution issues in specific environments
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Load environment variables
dotenv.config();

import connectDB from "./config/db.js";
import contentRoutes from "./routes/contentRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// Database Connection Middleware (For Vercel)
// ─────────────────────────────────────────────
// This ensures that on Vercel, every request checks for a DB connection
// before trying to execute route logic.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// ─────────────────────────────────────────────
// Mount Routes
// ─────────────────────────────────────────────
app.use("/api/menus", menuRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/collections", contentRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Aha Clone API is running...");
});

// ─────────────────────────────────────────────
// Execution Logic (Local vs Production)
// ─────────────────────────────────────────────

// 1. Export the app for Vercel's Serverless environment
export default app;

// 2. Only start the listener if we are running locally.
// Vercel sets NODE_ENV to 'production' by default.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      const server = app.listen(PORT, () => {
        console.log(`🚀 Local server running on http://localhost:${PORT}`);
      });

      server.on("error", (error) => {
        console.error("Local Server Error:", error);
      });
    })
    .catch((err) => {
      console.error("Local MongoDB connection failed!", err);
    });
}