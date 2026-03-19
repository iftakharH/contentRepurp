const express = require("express");
const router = express.Router();
const {
  repurposeContent,
  getUserContent,
  deleteContent,
} = require("../controllers/contentController");
const { protect } = require("../middleware/authMiddleware");
const { repurposeLimiter } = require("../middleware/rateLimiter");

router.post("/repurpose", protect, repurposeLimiter, repurposeContent);
router.get("/", protect, getUserContent);
router.delete("/:id", protect, deleteContent);

module.exports = router;
