import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from 'dns'

dns.setServers(["1.1.1.1", "8.8.8.8"])

// Load environment variables from .env
dotenv.config();

import connectDB from "./config/db.js";
import contentRoutes from "./routes/contentRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(cors());              // Enable Cross-Origin Resource Sharing
app.use(express.json());      // Parse incoming JSON request bodies

// ─────────────────────────────────────────────
// Mount Routes
// ─────────────────────────────────────────────
app.use("/api/menus", menuRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/collections", contentRoutes); // Reuse content router for collections

// ─────────────────────────────────────────────
// Connect to MongoDB, then start the server
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//   });
// });

connectDB()
  .then(() => {
    app.on("errorr", ((error) => {
      console.log("ERRORR:", error);
      throw error

    }))
    app.listen(PORT || 5000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log("mongodb connection failed!", err);

  })

export default app;