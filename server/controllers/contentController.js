import Content from "../models/Content.js";

// ─────────────────────────────────────────────
// GET /api/contents
// Query params: type, section, limit
// ─────────────────────────────────────────────
export const getContents = async (req, res) => {
  try {
    const { type, section, limit = 10 } = req.query;

    // Build filter object: optionally filter by content type
    const filter = {};
    if (type) filter.type = type;

    const itemLimit = Math.max(1, Math.min(parseInt(limit) || 10, 100)); // clamp between 1–100

    let contents;

    if (section === "recommended") {
      // Use MongoDB $sample for random selection
      const pipeline = [];
      if (type) pipeline.push({ $match: { type } });
      pipeline.push({ $sample: { size: itemLimit } });
      contents = await Content.aggregate(pipeline);
    } else {
      // Determine sort field based on section
      let sortOption = {};
      if (section === "trending") sortOption = { popularity: -1 };
      else if (section === "popular") sortOption = { rating: -1 };
      else if (section === "latest") sortOption = { release_year: -1 };

      contents = await Content.find(filter).sort(sortOption).limit(itemLimit);
    }

    res.json(contents);
  } catch (error) {
    console.error("getContents error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ─────────────────────────────────────────────
// GET /api/contents/:id
// Returns a single content item by ID
// ─────────────────────────────────────────────
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    // Mongoose CastError means the :id is not a valid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid content ID format" });
    }
    console.error("getContentById error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ─────────────────────────────────────────────
// GET /api/collections
// Query params: type, section (no limit — returns all)
// ─────────────────────────────────────────────
export const getCollections = async (req, res) => {
  try {
    const { type, section } = req.query;

    // Build filter: optionally filter by type
    const filter = {};
    if (type) filter.type = type;

    let contents;

    if (section === "recommended") {
      // $sample with a large number to effectively return all random items
      const pipeline = [];
      if (type) pipeline.push({ $match: { type } });
      pipeline.push({ $sample: { size: 1000 } }); // High size to return all
      contents = await Content.aggregate(pipeline);
    } else {
      // Determine sort field based on section
      let sortOption = {};
      if (section === "trending") sortOption = { popularity: -1 };
      else if (section === "popular") sortOption = { rating: -1 };
      else if (section === "latest") sortOption = { release_year: -1 };

      contents = await Content.find(filter).sort(sortOption);
    }

    res.json(contents);
  } catch (error) {
    console.error("getCollections error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
