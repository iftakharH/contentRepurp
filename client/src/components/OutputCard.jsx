import React, { useState } from "react";
import {
  HiClipboardDocument,
  HiTrash,
  HiCheck,
  HiClock,
  HiCpuChip,
} from "react-icons/hi2";

const platformLabels = {
  twitter: { label: "Twitter / X", emoji: "🐦" },
  linkedin: { label: "LinkedIn", emoji: "💼" },
  instagram: { label: "Instagram", emoji: "📸" },
  blog: { label: "Blog Post", emoji: "📝" },
  email: { label: "Email", emoji: "📧" },
  facebook: { label: "Facebook", emoji: "👥" },
};

const OutputCard = ({ content, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content.repurposedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platform = platformLabels[content.platform] || {
    label: content.platform,
    emoji: "📄",
  };

  // Extract short model name (e.g., "openai/gpt-4o" → "GPT-4o")
  const modelShortName = content.model
    ? content.model.split("/").pop().toUpperCase()
    : null;

  const formattedDate = new Date(content.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="glass rounded-2xl p-5 hover:border-white/10 transition-all duration-300 group flex flex-col h-96">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{platform.emoji}</span>
          <span className="text-sm font-semibold text-white">
            {platform.label}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary-600/20 text-primary-300 font-medium capitalize">
            {content.tone}
          </span>
          {modelShortName && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-white/10 text-dark-200 font-medium bg-dark-700">
              <HiCpuChip className="w-3.5 h-3.5" />
              {modelShortName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-dark-300">
          <HiClock className="w-3.5 h-3.5" />
          {formattedDate}
        </div>
      </div>

      {/* Content */}
      <div className="bg-dark-800 rounded-xl p-4 mb-4 border border-white/5 flex-1 overflow-y-auto custom-scrollbar relative">
        <p className="text-sm text-dark-50 whitespace-pre-wrap leading-relaxed">
          {content.repurposedContent}
        </p>
      </div>

      {/* Original Content Preview */}
      <details className="mb-4">
        <summary className="text-xs text-dark-300 cursor-pointer hover:text-dark-100 transition-colors">
          View original content
        </summary>
        <p className="mt-2 text-xs text-dark-300 leading-relaxed line-clamp-3">
          {content.originalContent}
        </p>
      </details>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
            copied
              ? "bg-green-500/20 text-green-400"
              : "bg-dark-600 text-dark-100 hover:bg-dark-500"
          }`}
        >
          {copied ? (
            <>
              <HiCheck className="w-3.5 h-3.5" /> Copied!
            </>
          ) : (
            <>
              <HiClipboardDocument className="w-3.5 h-3.5" /> Copy
            </>
          )}
        </button>
        <button
          onClick={() => onDelete(content._id)}
          className="flex items-center gap-1.5 text-xs font-medium text-dark-300 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all duration-200"
        >
          <HiTrash className="w-3.5 h-3.5" /> Delete
        </button>
      </div>
    </div>
  );
};

export default OutputCard;
