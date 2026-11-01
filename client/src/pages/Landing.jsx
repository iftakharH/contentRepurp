import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineClipboard,
  HiOutlineCpuChip,
  HiOutlineDocumentText,
  HiOutlineKey,
  HiOutlineSparkles,
} from "react-icons/hi2";
import LiveDemo from "../components/LiveDemo";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";
import { models, platforms } from "../data/options";

const steps = [
  {
    index: "01",
    title: "Paste the draft",
    body: "Drop in the blog post, video transcript, or newsletter you already wrote. No reformatting, no prep.",
    icon: HiOutlineDocumentText,
  },
  {
    index: "02",
    title: "Choose the room",
    body: "Pick a platform, a tone, and a model. That is the whole setup — no prompt engineering required.",
    icon: HiOutlineSparkles,
  },
  {
    index: "03",
    title: "Copy what fits",
    body: "Get a post, thread, or email with the right length and structure. Copy it out, or find it again in History.",
    icon: HiOutlineClipboard,
  },
];

const benefits = [
  "Unlimited generations with your own OpenRouter key",
  `${models.length} free models included out of the box`,
  "No markup on your API costs",
  "Keys are used per request and never stored",
];

const ModelLibrary = () => {
  const [selected, setSelected] = useState(models[0].value);

  return (
    <div className="overflow-hidden rounded-panel border border-white/[0.08] bg-base-850 shadow-panel">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <HiOutlineCpuChip className="h-4 w-4 text-primary-300" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Free model library
          </span>
        </div>
        <span className="text-[11px] text-ink-500 tabular">
          {models.length} available
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 p-3">
        {models.map((model) => {
          const active = model.value === selected;
          return (
            <button
              key={model.value}
              type="button"
              onClick={() => setSelected(model.value)}
              aria-pressed={active}
              className={`group flex items-center justify-between gap-2 rounded-[10px] border px-3 py-2.5 text-left transition-colors duration-200 ${
                active
                  ? "border-primary-400/40 bg-primary-500/[0.12]"
                  : "border-transparent bg-white/[0.02] hover:border-white/[0.08] hover:bg-white/[0.05]"
              }`}
            >
              <span className="min-w-0">
                <span
                  className={`block truncate text-[12.5px] font-semibold ${
                    active ? "text-primary-100" : "text-ink-200"
                  }`}
                >
                  {model.label}
                </span>
                <span className="mt-0.5 block text-[10.5px] text-ink-500">
                  {model.provider}
                </span>
              </span>
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                  active ? "bg-lime-400" : "bg-white/10 group-hover:bg-white/25"
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-5 py-3 text-[11px] text-ink-500">
        <span>Pick any of these inside the app.</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-500" aria-hidden="true" />
          Free on OpenRouter
        </span>
      </div>
    </div>
  );
};

const Landing = ({ user }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary-600/[0.16] blur-[120px]" />
        <div className="absolute left-[8%] top-[180px] h-[300px] w-[420px] rounded-full bg-[#1b2340]/50 blur-[100px]" />
      </div>
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(2.6rem,6.1vw,4.4rem)] font-semibold leading-[0.97] tracking-display text-ink-100">
              One draft.
              <br />
              Every platform
              <span className="text-primary-400">.</span>
            </h1>

            <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-ink-300 sm:text-[16.5px]">
              Paste a blog post, transcript, or newsletter. contentRepurp
              rewrites it for X, LinkedIn, Instagram, email, and your blog — in
              the tone you choose.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/register"
                className="btn-primary group px-6 py-3.5 text-[14.5px]"
              >
                Start repurposing free
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </Link>
              <a href="#preview" className="btn-secondary px-5 py-3.5">
                See it in action
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[12px] text-ink-400">
              <li className="inline-flex items-center gap-1.5">
                <HiOutlineCheck className="h-3.5 w-3.5 text-lime-400" />
                Free models included
              </li>
              <li className="inline-flex items-center gap-1.5">
                <HiOutlineCheck className="h-3.5 w-3.5 text-lime-400" />
                5 generations per hour
              </li>
              <li className="inline-flex items-center gap-1.5">
                <HiOutlineCheck className="h-3.5 w-3.5 text-lime-400" />
                History saved to your account
              </li>
            </ul>
          </div>

          <div id="preview" className="min-w-0 scroll-mt-24">
            <LiveDemo />
          </div>
        </div>
      </section>

      {/* Platform band */}
      <div className="border-y border-white/[0.06] bg-base-900/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 py-5 sm:justify-between sm:px-6 lg:px-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Writes for
          </span>
          {platforms.map((platform) => (
            <span
              key={platform.value}
              className="inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-400"
            >
              <platform.icon className="h-3.5 w-3.5 text-ink-500" />
              {platform.label}
            </span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-display text-ink-100">
            Three steps, no blank page.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-400">
            The work you already did is the input. Everything after it is
            adaptation: same argument, different room.
          </p>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.index} delay={index * 90}>
              <div className="flex items-center gap-3">
                <span className="font-display text-[11px] font-bold tracking-[0.16em] text-primary-300 tabular">
                  {step.index}
                </span>
                <span className="h-px flex-1 bg-white/[0.09]" />
                <step.icon className="h-[18px] w-[18px] text-ink-500" />
              </div>
              <h3 className="mt-5 font-display text-[19px] font-semibold tracking-tighter text-ink-100">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-400">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Bring your own key */}
      <section
        id="models"
        className="border-t border-white/[0.06] bg-base-900/30 scroll-mt-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-display text-ink-100">
              Use our free models, or plug in yours.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-400">
              Every listed model runs on OpenRouter&apos;s free tier. Add your
              own OpenRouter key when you want different models or more
              headroom — it is used for that request only.
            </p>

            <ul className="mt-7 space-y-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-[13.5px] text-ink-200"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime-500/[0.14]">
                    <HiOutlineCheck className="h-3 w-3 text-lime-400" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <p className="mt-7 flex items-start gap-2 text-[12px] leading-relaxed text-ink-500">
              <HiOutlineKey className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
              Add your own key only when you want more headroom. The free models
              work without one.
            </p>
          </div>

          <Reveal delay={80} className="min-w-0">
            <ModelLibrary />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-panel border border-white/[0.09] bg-base-850 px-6 py-14 shadow-panel sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-500/20 blur-[90px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 right-0 h-72 w-80 rounded-full bg-[#231a3d]/60 blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative max-w-xl">
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[1.02] tracking-display text-ink-100">
              Stop writing the same idea six times.
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-300">
              Paste one draft and leave with a week of posts. Free to start, no
              key required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="btn-primary group px-6 py-3.5 text-[14.5px]"
              >
                Create a free account
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </Link>
              <Link to="/login" className="btn-secondary px-5 py-3.5">
                I already have one
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
