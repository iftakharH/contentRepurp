const { OpenAI } = require("openai");

// OpenRouter uses the OpenAI-compatible API format
const ai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

module.exports = ai;
