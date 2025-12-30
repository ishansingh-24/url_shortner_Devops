const express = require("express");
const shortid = require("shortid");
const Url = require("./model");

const router = express.Router();

/**
 * Create short URL
 * POST /shorten
 */
router.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const code = shortid.generate();

    const newUrl = await Url.create({
      code,
      longUrl: url
    });

    res.json({
      shortUrl: `${process.env.BASE_URL}/${newUrl.code}`
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Redirect to original URL
 * GET /:code
 */
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ code: req.params.code });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
