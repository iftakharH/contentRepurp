import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineCheck,
  HiOutlineChevronDown,
  HiOutlineCpuChip,
  HiOutlineMagnifyingGlass,
  HiOutlinePaperAirplane,
  HiOutlineXMark,
} from "react-icons/hi2";
import { DEFAULT_MODEL, models, platforms, tones } from "../data/options";

const InputForm = ({ onSubmit, loading }) => {
  const [originalContent, setOriginalContent] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("professional");
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [modelOpen, setModelOpen] = useState(false);
  const [modelQuery, setModelQuery] = useState("");
  const [customApiKey, setCustomApiKey] = useState("");
  const [useCustomKey, setUseCustomKey] = useState(false);
  const pickerRef = useRef(null);

  const selectedModel = models.find((item) => item.value === model);
  const filteredModels = models.filter((item) =>
    `${item.label} ${item.provider}`
      .toLowerCase()
      .includes(modelQuery.trim().toLowerCase())
  );

  useEffect(() => {
    if (!modelOpen) return undefined;

    const onClick = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setModelOpen(false);
      }
    };
    const onKey = (event) => {
      if (event.key === "Escape") setModelOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [modelOpen]);

  const submit = () => {
    if (!originalContent.trim() || loading) return;
    onSubmit({
      originalContent,
      platform,
      tone,
      model,
      customApiKey: useCustomKey ? customApiKey : "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label
            htmlFor="original-content"
            className="text-[13px] font-medium text-ink-200"
          >
            Source content
          </label>
          <span
            className={`text-[11px] tabular ${
              originalContent.length > 5000 ? "text-red-400" : "text-ink-500"
            }`}
          >
            {originalContent.length.toLocaleString()} characters
          </span>
        </div>

        <div className="relative">
          <textarea
            id="original-content"
            value={originalContent}
            onChange={(event) => setOriginalContent(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste your blog post, article, transcript, or newsletter…"
            rows={5}
            className="field min-h-[132px] resize-y leading-relaxed"
            required
            aria-describedby="source-hint"
          />
          {originalContent && (
            <button
              type="button"
              onClick={() => setOriginalContent("")}
              aria-label="Clear source content"
              className="absolute right-2.5 top-2.5 rounded-md p-1 text-ink-500 transition-colors hover:bg-white/[0.06] hover:text-ink-200"
            >
              <HiOutlineXMark className="h-4 w-4" />
            </button>
          )}
        </div>
        <p id="source-hint" className="mt-2 text-[11.5px] leading-relaxed text-ink-500">
          A full post gives the model more to work with. Short fragments still
          work, but produce shorter drafts.
        </p>
      </div>

      <fieldset>
        <legend className="label">Platform</legend>
        <div className="grid grid-cols-3 gap-1.5">
          {platforms.map((item) => {
            const active = platform === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setPlatform(item.value)}
                aria-pressed={active}
                className={`flex flex-col items-center gap-1.5 rounded-tile border px-1.5 py-3 text-[11px] font-medium transition-all duration-200 ease-out ${
                  active
                    ? "border-primary-400/50 bg-primary-500/[0.12] text-ink-100 shadow-inset"
                    : "border-white/[0.06] bg-base-850 text-ink-400 hover:border-white/[0.12] hover:bg-base-750 hover:text-ink-200"
                }`}
              >
                <item.icon
                  className={`h-4 w-4 ${active ? "text-primary-300" : "text-ink-500"}`}
                />
                <span className="max-w-full truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">Tone</legend>
        <div className="flex flex-wrap gap-1.5">
          {tones.map((item) => {
            const active = tone === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setTone(item.value)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition-colors duration-200 ${
                  active
                    ? "border-primary-400/50 bg-primary-500/[0.14] text-primary-100"
                    : "border-white/[0.07] bg-base-850 text-ink-400 hover:border-white/[0.14] hover:text-ink-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div ref={pickerRef} className="relative">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-ink-200">Model</span>
          <span className="text-[11px] text-ink-500 tabular">
            {models.length} free models
          </span>
        </div>

        <button
          type="button"
          onClick={() => setModelOpen((open) => !open)}
          aria-expanded={modelOpen}
          aria-controls="model-picker"
          className={`flex w-full items-center justify-between gap-3 rounded-tile border px-3.5 py-2.5 text-left transition-colors duration-200 ${
            modelOpen
              ? "border-primary-400/60 bg-base-800"
              : "border-white/[0.08] bg-base-850 hover:border-white/[0.14]"
          }`}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <HiOutlineCpuChip className="h-4 w-4 shrink-0 text-primary-300" />
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-ink-100">
                {selectedModel?.label}
              </span>
              <span className="block text-[10.5px] text-ink-500">
                {selectedModel?.provider}
              </span>
            </span>
          </span>
          <HiOutlineChevronDown
            className={`h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 ${
              modelOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {modelOpen && (
          <div
            id="model-picker"
            className="relative z-30 mt-2 animate-pop-in overflow-hidden rounded-card border border-white/[0.09] bg-base-800 shadow-panel"
          >
            <div className="border-b border-white/[0.06] p-2">
              <div className="relative">
                <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-500" />
                <input
                  type="text"
                  value={modelQuery}
                  onChange={(event) => setModelQuery(event.target.value)}
                  placeholder="Search models or providers"
                  aria-label="Search models"
                  className="w-full rounded-lg border border-transparent bg-base-850 py-2 pl-8 pr-3 text-[12.5px] text-ink-100 placeholder:text-ink-500 focus:border-primary-400/50 focus:outline-none"
                />
              </div>
            </div>

            <ul role="listbox" className="max-h-60 overflow-y-auto p-1.5">
              {filteredModels.map((item) => {
                const active = item.value === model;
                return (
                  <li key={item.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setModel(item.value);
                        setModelOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-colors ${
                        active
                          ? "bg-primary-500/[0.14] text-primary-100"
                          : "text-ink-200 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[12.5px] font-medium">
                          {item.label}
                        </span>
                        <span className="block text-[10.5px] text-ink-500">
                          {item.provider}
                        </span>
                      </span>
                      {active && (
                        <HiOutlineCheck className="h-3.5 w-3.5 shrink-0 text-lime-400" />
                      )}
                    </button>
                  </li>
                );
              })}
              {filteredModels.length === 0 && (
                <li className="px-3 py-6 text-center text-[12px] text-ink-500">
                  No model matches “{modelQuery}”.
                </li>
              )}
            </ul>

            <div className="border-t border-white/[0.06] bg-base-850/60 p-3">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={useCustomKey}
                  onChange={(event) => setUseCustomKey(event.target.checked)}
                  className="h-3.5 w-3.5 rounded border-white/20 bg-base-850 accent-primary-500"
                />
                <span className="text-[12px] font-medium text-ink-200">
                  Use my OpenRouter key
                </span>
              </label>

              {useCustomKey && (
                <input
                  type="password"
                  value={customApiKey}
                  onChange={(event) => setCustomApiKey(event.target.value)}
                  placeholder="sk-or-v1-…"
                  aria-label="OpenRouter API key"
                  className="mt-2 w-full rounded-lg border border-white/[0.08] bg-base-850 px-2.5 py-2 text-[12px] text-ink-100 placeholder:text-ink-500 focus:border-primary-400/60 focus:outline-none"
                />
              )}

              <p className="mt-2 text-[10.5px] leading-relaxed text-ink-500">
                Sent with this request only. Never stored.
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading || !originalContent.trim()}
          className="btn-primary w-full py-3.5"
        >
          {loading ? (
            <>
              <HiOutlineArrowPath className="h-4 w-4 animate-spin" />
              Repurposing…
            </>
          ) : (
            <>
              <HiOutlinePaperAirplane className="h-4 w-4" />
              Repurpose content
            </>
          )}
        </button>

        <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-ink-500">
          <span>5 requests per hour on free models</span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            <span className="kbd">Ctrl</span>
            <span className="kbd">↵</span>
          </span>
        </div>
      </div>
    </form>
  );
};

export default InputForm;
