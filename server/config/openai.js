const { OpenAI } = require("openai");

// OpenRouter uses the OpenAI-compatible API format
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/free",
  apiKey: process.env.OPENROUTER_API_KEY,
});

module.exports = openai;
