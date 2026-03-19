import React, { useState } from "react";
import { HiPaperAirplane, HiArrowPath, HiCpuChip } from "react-icons/hi2";

const platforms = [
  { value: "twitter", label: "Twitter / X", emoji: "🐦" },
  { value: "linkedin", label: "LinkedIn", emoji: "💼" },
  { value: "instagram", label: "Instagram", emoji: "📸" },
  { value: "blog", label: "Blog Post", emoji: "📝" },
  { value: "email", label: "Email", emoji: "📧" },
  { value: "facebook", label: "Facebook", emoji: "👥" },
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "formal", label: "Formal" },
  { value: "inspirational", label: "Inspirational" },
];

const models = [
  { value: "openai/gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI" },
  { value: "openai/gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI" },
  { value: "openai/gpt-4o", label: "GPT-4o", provider: "OpenAI" },
  { value: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash", provider: "Google" },
  { value: "google/gemini-2.5-pro-preview", label: "Gemini 2.5 Pro", provider: "Google" },
  { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { value: "anthropic/claude-3-haiku", label: "Claude 3 Haiku", provider: "Anthropic" },
  { value: "meta-llama/llama-3.1-70b-instruct", label: "Llama 3.1 70B", provider: "Meta" },
  { value: "mistralai/mistral-small-3.1-24b-instruct", label: "Mistral Small 3.1", provider: "Mistral" },
  { value: "deepseek/deepseek-chat-v3-0324", label: "DeepSeek V3", provider: "DeepSeek" },
];

const InputForm = ({ onSubmit, loading }) => {
  const [originalContent, setOriginalContent] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("professional");
  const [model, setModel] = useState("openai/gpt-3.5-turbo");
  const [showModels, setShowModels] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [useCustomKey, setUseCustomKey] = useState(false);

  const selectedModel = models.find((m) => m.value === model);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalContent.trim()) return;
    onSubmit({ 
      originalContent, 
      platform, 
      tone, 
      model, 
      customApiKey: useCustomKey ? customApiKey : "" 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Content Textarea */}
      <div>
        <label className="block text-sm font-medium text-dark-100 mb-2">
          Original Content
        </label>
        <textarea
          id="original-content"
          value={originalContent}
          onChange={(e) => setOriginalContent(e.target.value)}
          placeholder="Paste your blog post, article, or any content you want to repurpose..."
          rows={6}
          className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200 resize-none"
          required
        />
      </div>

      {/* Platform Selection */}
      <div>
        <label className="block text-sm font-medium text-dark-100 mb-2">
          Target Platform
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {platforms.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPlatform(p.value)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                platform === p.value
                  ? "bg-primary-600/20 border-primary-500/50 text-primary-300"
                  : "bg-dark-700 border-white/5 text-dark-200 hover:border-white/10 hover:bg-dark-600"
              }`}
            >
              <span className="text-lg">{p.emoji}</span>
              <span className="truncate w-full text-center">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div>
        <label className="block text-sm font-medium text-dark-100 mb-2">
          Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTone(t.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                tone === t.value
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                  : "bg-dark-700 text-dark-200 hover:bg-dark-600 border border-white/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Model Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-dark-100">
            AI Model
          </label>
          <button
            type="button"
            onClick={() => setShowModels(!showModels)}
            className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors"
          >
            <HiCpuChip className="w-3.5 h-3.5" />
            {showModels ? "Hide models" : "Change model"}
          </button>
        </div>

        {/* Current model badge */}
        {!showModels && (
          <div className="flex items-center gap-2 bg-dark-700 border border-white/5 rounded-xl px-4 py-2.5">
            <HiCpuChip className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-white font-medium">
              {selectedModel?.label}
            </span>
            <span className="text-xs text-dark-300 bg-dark-600 px-2 py-0.5 rounded-full">
              {selectedModel?.provider}
            </span>
          </div>
        )}

        {/* Model grid */}
        {showModels && (
          <div className="space-y-4 animate-in">
            <div className="grid grid-cols-2 gap-2">
              {models.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => {
                    setModel(m.value);
                    setShowModels(false);
                  }}
                  className={`flex flex-col items-start gap-0.5 py-2.5 px-3 rounded-xl border text-left transition-all duration-200 ${
                    model === m.value
                      ? "bg-primary-600/20 border-primary-500/50"
                      : "bg-dark-700 border-white/5 hover:border-white/10 hover:bg-dark-600"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold truncate w-full ${
                      model === m.value ? "text-primary-300" : "text-white"
                    }`}
                  >
                    {m.label}
                  </span>
                  <span className="text-[10px] text-dark-300">{m.provider}</span>
                </button>
              ))}
            </div>

            {/* Custom API Key Section */}
            <div className="bg-dark-800/50 border border-white/5 rounded-xl p-4">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={useCustomKey}
                  onChange={(e) => setUseCustomKey(e.target.checked)}
                  className="w-4 h-4 rounded border-dark-300 text-primary-500 focus:ring-primary-500/50 bg-dark-700"
                />
                <span className="text-sm font-medium text-white">Use Custom OpenRouter API Key</span>
              </label>
              
              {useCustomKey && (
                <input
                  type="password"
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
                />
              )}
              <p className="text-xs text-dark-300 mt-2">
                Your key is only used for this specific request and is not stored permanently.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || !originalContent.trim()}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]"
        >
          {loading ? (
            <>
              <HiArrowPath className="w-5 h-5 animate-spin" />
              Repurposing...
            </>
          ) : (
            <>
              <HiPaperAirplane className="w-5 h-5" />
              Repurpose Content
            </>
          )}
        </button>
        <p className="text-center text-[10px] sm:text-xs text-dark-300 mt-3 font-medium">
          Limit: 5 requests per hour. Need more? Add a custom API key.
        </p>
      </div>
    </form>
  );
};

export default InputForm;
