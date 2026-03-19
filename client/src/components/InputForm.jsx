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

// To add a new free model in the future:
// 1. Find the model ID on OpenRouter (it MUST end in :free to be absolutely free)
// 2. Add an object to this array with its value (ID), label (Name), and provider.
const models = [
  { value: "google/gemma-3-27b-it:free", label: "Gemma 3 27B", provider: "Google" },
  { value: "mistralai/mistral-small-3.1-24b-instruct:free", label: "Mistral Small 3.1", provider: "Mistral" },
  { value: "qwen/qwen3-4b:free", label: "Qwen 3 4B", provider: "Qwen" },
  { value: "stepfun/step-3.5-flash:free", label: "Step 3.5 Flash", provider: "StepFun" },
  { value: "minimax/minimax-m2.5:free", label: "MiniMax M2.5", provider: "MiniMax" },
  { value: "openai/gpt-oss-20b:free", label: "GPT OSS 20B", provider: "OpenAI" },
  { value: "openai/gpt-oss-120b:free", label: "GPT OSS 120B", provider: "OpenAI" },
  { value: "nvidia/nemotron-3-super-120b-a12b:free", label: "Nemotron 3 Super", provider: "Nvidia" },
  { value: "meta-llama/llama-3.2-3b-instruct:free", label: "Llama 3.2 3B", provider: "Meta" },
  { value: "liquid/lfm-2.5-1.2b-thinking:free", label: "LFm 2.5 1.2B", provider: "Liquid" },
  { value: "arcee-ai/trinity-mini:free", label: "Trinity Mini", provider: "Arcee AI" },
  { value: "nvidia/nemotron-nano-9b-v2:free", label: "Nemotron Nano 9B", provider: "Nvidia" },
  { value: "z-ai/glm-4.5-air:free", label: "GLM 4.5 Air", provider: "Z-AI" },
  { value: "nousresearch/hermes-3-llama-3.1-405b:free", label: "Hermes 3 405B", provider: "NousResearch" },
];

const InputForm = ({ onSubmit, loading }) => {
  const [originalContent, setOriginalContent] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("professional");
  const [model, setModel] = useState("google/gemma-3-27b-it:free");
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
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-dark-100">
            Original Content
          </label>
          <span className={`text-[10px] sm:text-xs font-medium ${originalContent.length > 5000 ? 'text-red-400' : 'text-dark-300'}`}>
            {originalContent.length} chars
          </span>
        </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
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
