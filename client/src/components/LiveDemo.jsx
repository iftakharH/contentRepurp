import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowLongDown,
  HiOutlineCheck,
  HiOutlineClipboard,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { getTone } from "../data/options";
import { useOnView, useReducedMotion } from "../hooks/useOnView";
import { copyText } from "../utils/clipboard";

const samples = [
  {
    platform: "linkedin",
    tone: "professional",
    label: "LinkedIn",
    output:
      "Most teams don't have a content problem. They have a distribution problem.\n\nWe took one 1,240-word essay and pulled twelve posts out of it. Same argument, different rooms. The shift: stop treating each platform as a separate assignment. Write the thinking once, then change the room — not the thinking.\n\nWhich paragraph of your best essay would survive a 60-second read?",
  },
  {
    platform: "twitter",
    tone: "casual",
    label: "X / Twitter",
    output:
      "1/ You don't need more ideas. You need more rooms for the ones you have.\n\n2/ One essay → a thread, an email, four posts.\n\n3/ Adapt the room, not the thinking.\n\n4/ The best thread is a paragraph with the padding removed.\n\n5/ Write once. Publish everywhere it fits.",
  },
  {
    platform: "email",
    tone: "professional",
    label: "Email",
    output:
      "Subject: The one-draft habit\n\nHi there,\n\nLast week we published one essay. It became four LinkedIn posts, a thread, and the email you're reading now. Nothing was written twice.\n\nHere's the workflow: draft the argument, split the sections, then give each platform the version of it that fits.\n\nReply with the piece you're sitting on and I'll show you how it splits.\n\n— The contentRepurp team",
  },
  {
    platform: "instagram",
    tone: "inspirational",
    label: "Instagram",
    output:
      "One idea can live in six places.\n\nIt just needs a different door each time.\n\nSwipe → how we split a single essay into a week of posts.\n\n#contentstrategy #writing #creatoreconomy",
  },
];

const SOURCE_EXCERPT =
  "Most teams don't have a content problem. They have a distribution problem. A good essay earns attention once, then disappears into the archive — while the argument inside it could carry a week of posts, a thread, and an email.";

const LiveDemo = ({ autoPlay = true, compact = false, className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const [inView, setInView] = useState(false);
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  const viewRef = useOnView(setInView);
  const copyTimer = useRef(null);
  const tabRefs = useRef([]);

  const sample = samples[activeIndex];
  const tone = getTone(sample.tone);

  useEffect(() => {
    if (!autoPlay || paused || manual || reducedMotion || !inView) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % samples.length);
    }, 5600);

    return () => clearInterval(timer);
  }, [autoPlay, paused, manual, reducedMotion, inView]);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  const selectTab = (index) => {
    setActiveIndex(index);
    setManual(true);
  };

  const handleTabKeys = (event) => {
    const last = samples.length - 1;
    let next = null;

    if (event.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    if (event.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    setManual(true);
    tabRefs.current[next]?.focus();
  };

  const handleCopy = async () => {
    const success = await copyText(sample.output);
    if (!success) return;
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={viewRef}
      className={`relative overflow-hidden rounded-panel border border-white/[0.09] bg-base-850 shadow-panel ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-32 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-500" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Repurpose preview
          </span>
        </div>
        <span className="text-[11px] text-ink-500 tabular">
          {samples.length} formats
        </span>
      </div>

      <div className="relative p-4 sm:p-5">
        {/* Source */}
        {!compact && (
          <div className="rounded-card border border-white/[0.06] bg-base-900/80 p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                Source draft
              </span>
              <span className="text-[11px] text-ink-500 tabular">
                1,240 words
              </span>
            </div>
            <p className="fade-mask-b line-clamp-3 text-[13px] leading-relaxed text-ink-400">
              {SOURCE_EXCERPT}
            </p>
          </div>
        )}

        {/* Transformation marker */}
        {!compact ? (
          <div className="relative flex items-center gap-3 py-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.12]" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-400/25 bg-primary-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-200">
              <HiOutlineSparkles className="h-3 w-3" />
              Repurposed
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.12]" />
            <HiOutlineArrowLongDown
              className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary-400/20"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="mb-3 flex items-center gap-2 pt-1">
            <HiOutlineSparkles className="h-3 w-3 text-primary-300" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-500">
              Same draft, rewritten
            </span>
          </div>
        )}

        {/* Platform selector */}
        <div
          role="tablist"
          aria-label="Preview a platform"
          className="-mx-1 mb-3 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {samples.map((item, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={item.platform}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="repurpose-preview"
                id={`repurpose-tab-${item.platform}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={handleTabKeys}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors duration-200 ${
                  selected
                    ? "bg-white/[0.08] text-ink-100 shadow-inset"
                    : "text-ink-400 hover:bg-white/[0.04] hover:text-ink-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Output */}
        <div
          id="repurpose-preview"
          role="tabpanel"
          aria-labelledby={`repurpose-tab-${sample.platform}`}
          tabIndex={0}
          className="rounded-card border border-white/[0.07] bg-base-800 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="chip capitalize">{tone.label} tone</span>
            <span className="text-[11px] text-ink-500 tabular">
              {sample.output.length} characters
            </span>
          </div>

          <div key={sample.platform} className="animate-pop-in">
            <p
              className={`whitespace-pre-wrap text-[13px] leading-relaxed text-ink-200 sm:text-[13.5px] ${
                compact ? "min-h-[188px]" : "min-h-[132px]"
              }`}
            >
              {sample.output}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500" aria-hidden="true" />
              Ready to post
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-ink-300 transition-colors hover:bg-white/[0.05] hover:text-ink-100"
            >
              {copied ? (
                <>
                  <HiOutlineCheck className="h-3.5 w-3.5 text-lime-400" />
                  Copied
                </>
              ) : (
                <>
                  <HiOutlineClipboard className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
