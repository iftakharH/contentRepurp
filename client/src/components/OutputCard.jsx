import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineCheck,
  HiOutlineClipboard,
  HiOutlineCpuChip,
  HiOutlineTrash,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { getModelLabel, getPlatform, getTone } from "../data/options";
import { copyText } from "../utils/clipboard";
import { formatDateTime, relativeTime } from "../utils/format";

const OutputCard = ({ content, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const timers = useRef([]);

  const platform = getPlatform(content.platform);
  const tone = getTone(content.tone);
  const modelLabel = getModelLabel(content.model);
  const body = content.repurposedContent || "";
  const isLong = body.length > 340;

  useEffect(
    () => () => {
      timers.current.forEach((timer) => clearTimeout(timer));
    },
    []
  );

  const later = (callback, delay) => {
    const timer = setTimeout(callback, delay);
    timers.current.push(timer);
  };

  const handleCopy = async () => {
    const success = await copyText(body);
    if (!success) return;
    setCopied(true);
    later(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (!confirming) {
      setConfirming(true);
      later(() => setConfirming(false), 3200);
      return;
    }
    onDelete();
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-white/[0.07] bg-base-800 transition-colors duration-200 hover:border-white/[0.13]">
      <div className="flex items-start justify-between gap-3 border-b border-white/[0.05] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-white/[0.06] bg-base-850 text-ink-300">
            <platform.icon className="h-[15px] w-[15px]" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink-100">
              {platform.label}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-ink-500">
              <span className="capitalize">{tone.label}</span>
              <span aria-hidden="true">·</span>
              <span
                className="inline-flex min-w-0 items-center gap-1"
                title={content.model}
              >
                <HiOutlineCpuChip className="h-3 w-3 shrink-0" />
                <span className="truncate">{modelLabel}</span>
              </span>
            </p>
          </div>
        </div>

        <time
          dateTime={content.createdAt}
          title={formatDateTime(content.createdAt)}
          className="shrink-0 pt-0.5 text-[10.5px] text-ink-500 tabular"
        >
          {relativeTime(content.createdAt)}
        </time>
      </div>

      <div className="flex-1 px-4 pt-3">
        <div className="relative">
          <p
            className={`max-w-[70ch] whitespace-pre-wrap text-[13px] leading-relaxed text-ink-200 ${
              expanded ? "" : "line-clamp-[9]"
            }`}
          >
            {body}
          </p>
          {!expanded && isLong && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-base-800 to-transparent"
              aria-hidden="true"
            />
          )}
        </div>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary-300 transition-colors hover:text-primary-200"
          >
            <HiOutlineChevronDown
              className={`h-3 w-3 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
            {expanded ? "Show less" : "Read full draft"}
          </button>
        )}

        <details className="group/original mt-3 border-t border-white/[0.05] pt-2.5">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-[11px] text-ink-500 transition-colors hover:text-ink-300 [&::-webkit-details-marker]:hidden">
            <HiOutlineChevronDown className="h-3 w-3 transition-transform duration-200 group-open/original:rotate-180" />
            Original source
          </summary>
          <p className="fade-mask-b mt-2 max-h-24 overflow-y-auto whitespace-pre-wrap text-[11.5px] leading-relaxed text-ink-500">
            {content.originalContent}
          </p>
        </details>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.05] px-3 py-2.5">
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition-colors ${
            copied
              ? "bg-lime-500/[0.14] text-lime-300"
              : "text-ink-300 hover:bg-white/[0.05] hover:text-ink-100"
          }`}
        >
          {copied ? (
            <>
              <HiOutlineCheck className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <HiOutlineClipboard className="h-3.5 w-3.5" />
              Copy draft
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition-colors ${
            confirming
              ? "bg-red-500/[0.14] text-red-300"
              : "text-ink-500 hover:bg-red-500/[0.08] hover:text-red-400"
          }`}
        >
          <HiOutlineTrash className="h-3.5 w-3.5" />
          {confirming ? "Confirm delete" : "Delete"}
        </button>
      </div>
    </article>
  );
};

export default OutputCard;
