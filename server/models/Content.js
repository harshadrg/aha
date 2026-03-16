import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    // Title of the content
    title: {
      type: String,
      required: true,
    },

    // Short description / synopsis
    description: {
      type: String,
    },

    // URL for the poster image (portrait)
    poster_url: {
      type: String,
    },

    // URL for the thumbnail image (16:9)
    thumbnail_url: {
      type: String,
    },

    // URL for the banner image (landscape / hero)
    banner_url: {
      type: String,
    },

    // List of genres e.g. ["Action", "Drama"]
    genre: {
      type: [String],
    },

    // Year the content was released
    release_year: {
      type: Number,
    },

    // Type of content: movie, show, or original
    type: {
      type: String,
      enum: ["movie", "show", "original"],
      required: true,
    },

    // Primary language of the content
    language: {
      type: String,
    },

    // Rating out of 10 (hardcoded in seed data)
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },

    // Popularity score (hardcoded in seed data)
    popularity: {
      type: Number,
    },

    // Duration string e.g. "2h 15m" or "45m per episode"
    duration: {
      type: String,
    },

    // List of cast members
    cast: {
      type: [String],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
