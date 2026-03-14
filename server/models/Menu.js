import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    // Display name for the menu item e.g. "Movies"
    name: {
      type: String,
      required: true,
    },

    // URL-friendly slug e.g. "movies"
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    // The type of content this menu item filters
    contentType: {
      type: String,
      enum: ["movie", "show", "original", "all"],
    },

    // Sort order to control display position in the navbar
    order: {
      type: Number,
      default: 0,
    },

    // Whether this menu item is visible/active
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
