const Content = require("../models/Content");
const openaiGlobal = require("../config/openai");
const { OpenAI } = require("openai");

// @desc    Repurpose content using OpenRouter
// @route   POST /api/content/repurpose
// @access  Private
const repurposeContent = async (req, res) => {
  try {
    const { originalContent, platform, tone, model, customApiKey } = req.body;
    const selectedModel = model || "openai/gpt-3.5-turbo";

    if (!originalContent || !platform) {
      return res
        .status(400)
        .json({ message: "Please provide content and target platform" });
    }

    const prompt = `You are an expert content repurposing assistant. Take the following content and repurpose it for ${platform}. 
Use a ${tone || "professional"} tone. 
Make it optimized for the platform's best practices (character limits, hashtags, formatting, etc.).

Original Content:
${originalContent}

Repurposed Content for ${platform}:`;

    // Determine which OpenAI client to use
    let openaiClient = openaiGlobal;
    if (customApiKey && customApiKey.trim() !== "") {
      openaiClient = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: customApiKey.trim(),
      });
    }

    const completion = await openaiClient.chat.completions.create({
      model: selectedModel,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const repurposedContent = completion.choices[0].message.content.trim();

    // Save to database
    const content = await Content.create({
      user: req.user._id,
      originalContent,
      platform,
      repurposedContent,
      tone: tone || "professional",
      model: selectedModel,
    });

    res.status(201).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all content for a user
// @route   GET /api/content
// @access  Private
const getUserContent = async (req, res) => {
  try {
    const content = await Content.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete content by ID
// @route   DELETE /api/content/:id
// @access  Private
const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Ensure user owns the content
    if (content.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await content.deleteOne();
    res.json({ message: "Content removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { repurposeContent, getUserContent, deleteContent };
