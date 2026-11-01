import React from "react";
import { Link } from "react-router-dom";

export const LogoMark = ({ className = "h-8 w-8" }) => (
  <span
    className={`relative inline-flex shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-800 text-white shadow-[0_6px_16px_-8px_rgba(76,110,245,0.9)] ring-1 ring-inset ring-white/20 ${className}`}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[62%] w-[62%]"
    >
      <rect x="3.25" y="3.25" width="9.5" height="11.5" rx="2.4" />
      <path d="M15.75 7.75h2.4a2.5 2.5 0 0 1 2.5 2.5v7.9a2.5 2.5 0 0 1-2.5 2.5h-7.9a2.5 2.5 0 0 1-2.5-2.5v-2.4" />
      <path d="M6.4 7.1h3.2M6.4 10.1h4.9" />
    </svg>
  </span>
);

const Logo = ({ to = "/", className = "" }) => (
  <Link
    to={to}
    className={`group inline-flex items-center gap-2.5 rounded-lg ${className}`}
    aria-label="contentRepurp home"
  >
    <LogoMark />
    <span className="font-display text-[17px] font-semibold tracking-display text-ink-100">
      content<span className="text-primary-300">Repurp</span>
    </span>
  </Link>
);

export default Logo;
