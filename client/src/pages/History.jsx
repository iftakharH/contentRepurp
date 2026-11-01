import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowPath,
  HiOutlineCheck,
  HiOutlineClipboard,
  HiOutlineClock,
  HiOutlineCpuChip,
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
} from "react-icons/hi2";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { getHistory, repurposeContent } from "../services/api";
import { getModelLabel, getPlatform, getTone, platforms } from "../data/options";
import { copyText } from "../utils/clipboard";
import { formatDateTime, relativeTime } from "../utils/format";
import { usePageTitle } from "../hooks/usePageTitle";

const History = () => {
  usePageTitle("History");

  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [regeneratingId, setRegeneratingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [query, setQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const timers = useRef([]);

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

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await getHistory();
      setHistoryList(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load your history. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const showToast = ({ title, message, suggestion, type = "error" }) => {
    setToast({ id: Date.now(), title, message, suggestion, type });
  };

  const handleCopy = async (id, text) => {
    const success = await copyText(text);
    if (!success) {
      showToast({
        title: "Copy blocked",
        message: "This browser would not let the page write to your clipboard.",
        suggestion: "Select the draft text and copy it manually.",
      });
      return;
    }
    setCopiedId(id);
    later(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = async (item) => {
    try {
      setRegeneratingId(item._id);
      await repurposeContent({
        originalContent: item.originalContent,
        platform: item.platform,
        tone: item.tone,
        model: item.model,
      });
      await fetchHistory();
      showToast({
        type: "success",
        title: "Regenerated",
        message: `A fresh ${getPlatform(item.platform).label} draft was added to your history.`,
      });
    } catch (err) {
      showToast({
        title: "Regenerate failed",
        message:
          err.response?.data?.message ||
          "The model did not return a new draft.",
        suggestion: "Try again, or switch models from the Dashboard composer.",
      });
    } finally {
      setRegeneratingId(null);
    }
  };

  const platformCounts = useMemo(
    () =>
      historyList.reduce((acc, item) => {
        acc[item.platform] = (acc[item.platform] || 0) + 1;
        return acc;
      }, {}),
    [historyList]
  );

  const availablePlatforms = useMemo(
    () => platforms.filter((platform) => platformCounts[platform.value]),
    [platformCounts]
  );

  const filteredList = useMemo(() => {
    const search = query.trim().toLowerCase();
    return historyList.filter((item) => {
      if (platformFilter !== "all" && item.platform !== platformFilter) {
        return false;
      }
      if (!search) return true;
      return `${item.repurposedContent} ${item.originalContent} ${item.platform} ${item.tone}`
        .toLowerCase()
        .includes(search);
    });
  }, [historyList, platformFilter, query]);

  const filtersActive = platformFilter !== "all" || query.trim() !== "";
  const clearFilters = () => {
    setPlatformFilter("all");
    setQuery("");
  };

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] font-semibold tracking-display text-ink-100 sm:text-[32px]">
              History
            </h1>
            <p className="mt-1.5 text-[13.5px] text-ink-400">
              Every draft you have generated, newest first.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-tile border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[12.5px] font-medium text-ink-300 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-ink-100"
          >
            <HiOutlineDocumentText className="h-3.5 w-3.5" />
            New draft
          </Link>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-card border border-red-500/25 bg-red-500/[0.06] px-4 py-3"
          >
            <p className="text-[12.5px] text-red-200">{error}</p>
            <button
              type="button"
              onClick={fetchHistory}
              className="text-[12px] font-semibold text-red-300 underline underline-offset-2 hover:text-red-200"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && historyList.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPlatformFilter("all")}
                aria-pressed={platformFilter === "all"}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  platformFilter === "all"
                    ? "border-primary-400/40 bg-primary-500/[0.14] text-primary-100"
                    : "border-white/[0.07] bg-white/[0.02] text-ink-400 hover:border-white/[0.14] hover:text-ink-200"
                }`}
              >
                All · {historyList.length}
              </button>
              {availablePlatforms.map((platform) => (
                <button
                  key={platform.value}
                  type="button"
                  onClick={() => setPlatformFilter(platform.value)}
                  aria-pressed={platformFilter === platform.value}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    platformFilter === platform.value
                      ? "border-primary-400/40 bg-primary-500/[0.14] text-primary-100"
                      : "border-white/[0.07] bg-white/[0.02] text-ink-400 hover:border-white/[0.14] hover:text-ink-200"
                  }`}
                >
                  <platform.icon className="h-3 w-3" />
                  {platform.label} · {platformCounts[platform.value]}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-60">
              <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search history"
                aria-label="Search history"
                className="field h-9 py-0 pl-9 pr-3 text-[12.5px]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink-500 hover:text-ink-200"
                >
                  <HiOutlineXMark className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="mt-5">
          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="rounded-card border border-white/[0.06] bg-base-800 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="skeleton h-8 w-8 rounded-[9px]" />
                    <div className="skeleton h-2.5 w-28 rounded-full" />
                    <div className="skeleton ml-auto h-2.5 w-16 rounded-full" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="skeleton h-2.5 w-full rounded-full" />
                    <div className="skeleton h-2.5 w-11/12 rounded-full" />
                    <div className="skeleton h-2.5 w-8/12 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : historyList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-panel border border-dashed border-white/[0.1] bg-base-900/40 px-6 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-card border border-white/[0.07] bg-base-800">
                <HiOutlineClock className="h-5 w-5 text-primary-300" />
              </span>
              <h2 className="mt-4 font-display text-[18px] font-semibold tracking-tighter text-ink-100">
                No history yet
              </h2>
              <p className="mt-2 max-w-[40ch] text-[13px] leading-relaxed text-ink-400">
                Drafts you generate appear here automatically, ready to copy
                again or regenerate with a different model.
              </p>
              <Link
                to="/dashboard"
                className="btn-primary mt-5 px-4 py-2 text-[12.5px]"
              >
                Start a draft
              </Link>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-panel border border-dashed border-white/[0.1] bg-base-900/40 px-6 py-14 text-center">
              <h2 className="font-display text-[16px] font-semibold text-ink-100">
                Nothing matches that search
              </h2>
              <p className="mt-1.5 text-[12.5px] text-ink-400">
                Try another term or platform filter.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-[12.5px] font-semibold text-primary-300 underline underline-offset-2 hover:text-primary-200"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredList.map((item) => {
                const platform = getPlatform(item.platform);
                const tone = getTone(item.tone);
                const expanded = expandedId === item._id;
                const regenerating = regeneratingId === item._id;
                const body = item.repurposedContent || "";
                const isLong = body.length > 260;

                return (
                  <article
                    key={item._id}
                    className="overflow-hidden rounded-card border border-white/[0.07] bg-base-800 transition-colors duration-200 hover:border-white/[0.12]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.05] px-4 py-3.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-white/[0.06] bg-base-850 text-ink-300">
                          <platform.icon className="h-[15px] w-[15px]" />
                        </span>
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-x-2 text-[13px] font-semibold text-ink-100">
                            {platform.label}
                            <span className="text-[10.5px] font-normal capitalize text-ink-500">
                              {tone.label}
                            </span>
                          </p>
                          <p className="mt-0.5 flex items-center gap-2 text-[10.5px] text-ink-500">
                            <time
                              dateTime={item.createdAt}
                              title={formatDateTime(item.createdAt)}
                            >
                              {relativeTime(item.createdAt)}
                            </time>
                            {item.model && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="inline-flex min-w-0 items-center gap-1">
                                  <HiOutlineCpuChip className="h-3 w-3 shrink-0" />
                                  <span className="truncate">
                                    {getModelLabel(item.model)}
                                  </span>
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopy(item._id, body)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition-colors ${
                            copiedId === item._id
                              ? "bg-lime-500/[0.14] text-lime-300"
                              : "text-ink-300 hover:bg-white/[0.05] hover:text-ink-100"
                          }`}
                        >
                          {copiedId === item._id ? (
                            <HiOutlineCheck className="h-3.5 w-3.5" />
                          ) : (
                            <HiOutlineClipboard className="h-3.5 w-3.5" />
                          )}
                          {copiedId === item._id ? "Copied" : "Copy"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRegenerate(item)}
                          disabled={regenerating}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-300 transition-colors hover:border-primary-400/30 hover:bg-primary-500/[0.08] hover:text-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <HiOutlineArrowPath
                            className={`h-3.5 w-3.5 ${regenerating ? "animate-spin" : ""}`}
                          />
                          {regenerating ? "Regenerating…" : "Regenerate"}
                        </button>
                      </div>
                    </div>

                    <div className="px-4 py-3.5">
                      <p
                        className={`max-w-[74ch] whitespace-pre-wrap text-[13px] leading-relaxed text-ink-200 ${
                          expanded ? "" : "line-clamp-3"
                        }`}
                      >
                        {body}
                      </p>

                      {isLong && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(expanded ? null : item._id)
                          }
                          aria-expanded={expanded}
                          className="mt-2 text-[11.5px] font-semibold text-primary-300 transition-colors hover:text-primary-200"
                        >
                          {expanded ? "Show less" : "Read full draft"}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}

              {filtersActive && (
                <p className="pt-1 text-[11px] text-ink-500">
                  Showing {filteredList.length} of {historyList.length}.{" "}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="font-semibold text-primary-300 hover:text-primary-200"
                  >
                    Reset filters
                  </button>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          key={toast.id}
          title={toast.title}
          message={toast.message}
          suggestion={toast.suggestion}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Footer compact />
    </div>
  );
};

export default History;
