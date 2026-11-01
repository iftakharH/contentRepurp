import React from "react";
import { Link } from "react-router-dom";
import { LogoMark } from "./Logo";

const Footer = ({ compact = false }) => {
  if (compact) {
    return (
      <footer className="mt-auto border-t border-white/[0.06] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-[11.5px] text-ink-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-ink-300">contentRepurp</span>
          </p>
          <p>Free models included · 5 generations per hour</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-base-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" />
            <span className="font-display text-[16px] font-semibold tracking-display text-ink-100">
              contentRepurp
            </span>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-ink-400">
            One draft, every platform. Turn long-form writing into posts,
            threads, and emails that sound like you.
          </p>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Product
          </h2>
          <ul className="mt-3 space-y-2 text-[13px]">
            <li>
              <a
                href="/#how-it-works"
                className="text-ink-300 transition-colors hover:text-ink-100"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="/#models"
                className="text-ink-300 transition-colors hover:text-ink-100"
              >
                Free models
              </a>
            </li>
            <li>
              <Link
                to="/register"
                className="text-ink-300 transition-colors hover:text-ink-100"
              >
                Create account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Account
          </h2>
          <ul className="mt-3 space-y-2 text-[13px]">
            <li>
              <Link
                to="/login"
                className="text-ink-300 transition-colors hover:text-ink-100"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-ink-300 transition-colors hover:text-ink-100"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="text-ink-300 transition-colors hover:text-ink-100"
              >
                History
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-[11.5px] text-ink-500 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} contentRepurp. All rights reserved.</p>
          <p>Your drafts stay yours.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
