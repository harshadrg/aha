import Menu from "../models/Menu.js";

// ─────────────────────────────────────────────
// GET /api/menus
// Returns all active menus sorted by order
// ─────────────────────────────────────────────
export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find({ isActive: true }).sort({ order: 1 });
    res.json(menus);
  } catch (error) {
    console.error("getMenus error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
