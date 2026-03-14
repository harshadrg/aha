import express from "express";
import { getMenus } from "../controllers/menuController.js";

const router = express.Router();

// GET /api/menus → Fetch all active navigation menus
router.get("/", getMenus);

export default router;
