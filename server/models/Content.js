const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalContent: {
      type: String,
      required: [true, "Please provide content to repurpose"],
    },
    platform: {
      type: String,
      required: [true, "Please specify the target platform"],
      enum: ["twitter", "linkedin", "instagram", "blog", "email", "facebook"],
    },
    repurposedContent: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      default: "professional",
      enum: ["professional", "casual", "humorous", "formal", "inspirational"],
    },
    model: {
      type: String,
      default: "openai/gpt-3.5-turbo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
