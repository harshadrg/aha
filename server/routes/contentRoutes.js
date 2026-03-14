import express from "express";
import {
  getContents,
  getContentById,
  getCollections,
} from "../controllers/contentController.js";

const router = express.Router();

// GET /api/contents        → Fetch contents with optional type, section, limit
// GET /api/collections     → Also hits this route (mounted separately in server.js)
router.get("/", (req, res, next) => {
  // server.js mounts this router at both /api/contents and /api/collections
  // Distinguish by checking the base URL of the request
  if (req.baseUrl === "/api/collections") {
    return getCollections(req, res, next);
  }
  return getContents(req, res, next);
});

// GET /api/contents/:id    → Fetch a single content item by ID
router.get("/:id", getContentById);

export default router;
