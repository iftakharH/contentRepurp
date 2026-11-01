import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
  HiOutlineXMark,
} from "react-icons/hi2";
import InputForm from "../components/InputForm";
import OutputCard from "../components/OutputCard";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { deleteContent, getUserContent, repurposeContent } from "../services/api";
import { getPlatform, platforms } from "../data/options";
import { usePageTitle } from "../hooks/usePageTitle";

const SkeletonCard = () => (
  <div className="rounded-card border border-white/[0.06] bg-base-800 p-4">
    <div className="flex items-center gap-2.5">
      <div className="skeleton h-8 w-8 rounded-[9px]" />
      <div className="flex-1 space-y-1.5">
        <div className="skeleton h-2.5 w-24 rounded-full" />
        <div className="skeleton h-2 w-16 rounded-full" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="skeleton h-2.5 w-full rounded-full" />
      <div className="skeleton h-2.5 w-11/12 rounded-full" />
      <div className="skeleton h-2.5 w-9/12 rounded-full" />
      <div className="skeleton h-2.5 w-10/12 rounded-full" />
    </div>
  </div>
);

const Dashboard = ({ user }) => {
  usePageTitle("Workspace");

  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [toast, setToast] = useState(null);
  const [query, setQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");

  const showToast = ({ title, message, suggestion, type = "error" }) => {
    setToast({ id: Date.now(), title, message, suggestion, type });
  };

  const fetchContent = async () => {
    setFetchLoading(true);
    setFetchError("");
    try {
      const res = await getUserContent();
      setContents(res.data);
    } catch (error) {
      console.error("Error fetching content:", error);
      setFetchError(
        error.response?.data?.message ||
          "Could not load your drafts. Check your connection and try again."
      );
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleRepurpose = async (data) => {
    setLoading(true);
    try {
      const res = await repurposeContent(data);
      setContents((current) => [res.data, ...current]);
      showToast({
        type: "success",
        title: "Draft ready",
        message: `Your ${getPlatform(data.platform).label} draft is at the top of the list.`,
      });
    } catch (error) {
      console.error("Error repurposing content:", error);
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Failed to repurpose content";

      if (status === 429) {
        showToast({
          title: "Free model busy",
          message:
            "This free provider is overloaded or out of capacity right now.",
          suggestion:
            "Change the model in the composer and try again, or wait a minute.",
        });
      } else {
        showToast({
          title: "Repurpose failed",
          message: msg,
          suggestion: "Check the source content and model, then try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContent(id);
      setContents((current) => current.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting content:", error);
      showToast({
        title: "Delete failed",
        message:
          error.response?.data?.message || "That draft could not be removed.",
        suggestion: "Try again in a moment.",
      });
    }
  };

  const platformCounts = useMemo(() => {
    const counts = contents.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {});
    return counts;
  }, [contents]);

  const availablePlatforms = useMemo(
    () => platforms.filter((platform) => platformCounts[platform.value]),
    [platformCounts]
  );

  const filteredContents = useMemo(() => {
    const search = query.trim().toLowerCase();
    return contents.filter((item) => {
      if (platformFilter !== "all" && item.platform !== platformFilter) {
        return false;
      }
      if (!search) return true;
      return `${item.repurposedContent} ${item.originalContent} ${item.platform} ${item.tone}`
        .toLowerCase()
        .includes(search);
    });
  }, [contents, platformFilter, query]);

  const filtersActive = platformFilter !== "all" || query.trim() !== "";

  const clearFilters = () => {
    setPlatformFilter("all");
    setQuery("");
  };

  const focusComposer = () => {
    const node = document.getElementById("original-content");
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
    node?.focus({ preventScroll: true });
  };

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] font-semibold tracking-display text-ink-100 sm:text-[32px]">
              Workspace
            </h1>
            <p className="mt-1.5 text-[13.5px] text-ink-400">
              Welcome back,{" "}
              <span className="font-medium text-ink-200">{user.name}</span>.
              Paste a draft and turn it into something publishable.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/history"
              className="inline-flex items-center gap-1.5 rounded-tile border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[12.5px] font-medium text-ink-300 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-ink-100"
            >
              <HiOutlineClock className="h-3.5 w-3.5" />
              History
              <HiOutlineArrowRight className="h-3 w-3 text-ink-500" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[380px_minmax(0,1fr)] xl:grid-cols-[410px_minmax(0,1fr)]">
          <aside>
            <div className="overflow-hidden rounded-panel border border-white/[0.08] bg-base-800 shadow-lift">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <HiOutlineSparkles className="h-4 w-4 text-primary-300" />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                    New draft
                  </span>
                </div>
                <span className="chip">Free</span>
              </div>
              <div className="p-4">
                <InputForm onSubmit={handleRepurpose} loading={loading} />
              </div>
            </div>
          </aside>

          <section aria-labelledby="results-heading" className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <h2
                  id="results-heading"
                  className="font-display text-[17px] font-semibold tracking-tighter text-ink-100"
                >
                  Your drafts
                </h2>
                <span className="text-[11.5px] text-ink-500 tabular">
                  {fetchLoading
                    ? "loading…"
                    : contents.length === 0
                    ? "no drafts yet"
                    : `${filteredContents.length} of ${contents.length}`}
                </span>
              </div>

              <div className="relative w-full sm:w-64">
                <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search drafts"
                  aria-label="Search drafts"
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

            {!fetchLoading && contents.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
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
                  All · {contents.length}
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
            )}

            {fetchError && (
              <div
                role="alert"
                className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-card border border-red-500/25 bg-red-500/[0.06] px-4 py-3"
              >
                <p className="text-[12.5px] text-red-200">{fetchError}</p>
                <button
                  type="button"
                  onClick={fetchContent}
                  className="text-[12px] font-semibold text-red-300 underline underline-offset-2 hover:text-red-200"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="mt-4">
              {fetchLoading ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : contents.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-panel border border-dashed border-white/[0.1] bg-base-900/40 px-6 py-16 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-card border border-white/[0.07] bg-base-800">
                    <HiOutlineSparkles className="h-5 w-5 text-primary-300" />
                  </span>
                  <h3 className="mt-4 font-display text-[18px] font-semibold tracking-tighter text-ink-100">
                    Nothing here yet
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-[13px] leading-relaxed text-ink-400">
                    Paste a draft in the composer and press Repurpose. Your
                    first result will land right here.
                  </p>
                  <button
                    type="button"
                    onClick={focusComposer}
                    className="btn-secondary mt-5 px-4 py-2 text-[12.5px]"
                  >
                    Jump to the composer
                  </button>
                </div>
              ) : filteredContents.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-panel border border-dashed border-white/[0.1] bg-base-900/40 px-6 py-14 text-center">
                  <h3 className="font-display text-[16px] font-semibold text-ink-100">
                    No drafts match those filters
                  </h3>
                  <p className="mt-1.5 text-[12.5px] text-ink-400">
                    Try a different search term or platform.
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
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {filteredContents.map((content) => (
                    <OutputCard
                      key={content._id}
                      content={content}
                      onDelete={() => handleDelete(content._id)}
                    />
                  ))}
                </div>
              )}

              {filtersActive && filteredContents.length > 0 && (
                <p className="mt-3 text-[11px] text-ink-500">
                  Filters are on.{" "}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="font-semibold text-primary-300 hover:text-primary-200"
                  >
                    Reset
                  </button>
                </p>
              )}
            </div>
          </section>
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

export default Dashboard;
