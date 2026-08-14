const express = require("express");

const router = express.Router();

const {
  summarizeNote,
  generateNote,
} = require("../controllers/aiController");

const protect = require("../middleware/authMiddleware");

// AI Summarize
router.post(
  "/summarize",
  protect,
  summarizeNote
);

// AI Generate Note
router.post(
  "/generate",
  protect,
  generateNote
);

module.exports = router;