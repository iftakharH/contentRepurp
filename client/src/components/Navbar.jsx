import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiOutlineClock,
  HiOutlineXMark,
  HiOutlineUser,
} from "react-icons/hi2";
import Logo from "./Logo";

const navLinkClass = ({ isActive }) =>
  `relative rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
    isActive
      ? "text-ink-100 after:absolute after:inset-x-3 after:-bottom-px after:h-[2px] after:rounded-full after:bg-primary-400"
      : "text-ink-400 hover:bg-white/[0.04] hover:text-ink-100"
  }`;

const anchorClass =
  "rounded-lg px-3 py-2 text-[13.5px] font-medium text-ink-400 transition-colors duration-200 hover:bg-white/[0.04] hover:text-ink-100";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLanding = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setDropdownOpen(false);
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    onLogout();
    navigate("/");
  };

  const solid = !isLanding || scrolled;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? "border-white/[0.06] bg-base-950/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo to={user ? "/dashboard" : "/"} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {isLanding ? (
            <>
              <a href="#how-it-works" className={anchorClass}>
                How it works
              </a>
              <a href="#models" className={anchorClass}>
                Models
              </a>
              <a href="#preview" className={anchorClass}>
                Preview
              </a>
            </>
          ) : user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/history" className={navLinkClass}>
                History
              </NavLink>
            </>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] py-1 pl-1 pr-1 sm:pr-3 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-[12px] font-bold text-white ring-1 ring-inset ring-white/20">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
                <span className="hidden max-w-[120px] truncate text-[13px] font-medium text-ink-100 sm:block">
                  {user.name}
                </span>
              </button>

              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-60 origin-top-right animate-pop-in overflow-hidden rounded-card border border-white/[0.09] bg-base-800 p-1.5 shadow-panel"
                >
                  <div className="border-b border-white/[0.06] px-3 py-2.5">
                    <p className="truncate text-[13px] font-semibold text-ink-100">
                      {user.name}
                    </p>
                    <p className="truncate text-[11.5px] text-ink-400">
                      {user.email}
                    </p>
                  </div>
                  <div className="pt-1.5">
                    <Link
                      to="/dashboard"
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-ink-200 transition-colors hover:bg-white/[0.05] hover:text-ink-100"
                    >
                      <HiOutlineUser className="h-4 w-4 text-ink-400" />
                      Workspace
                    </Link>
                    <Link
                      to="/history"
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-ink-200 transition-colors hover:bg-white/[0.05] hover:text-ink-100"
                    >
                      <HiOutlineClock className="h-4 w-4 text-ink-400" />
                      History
                    </Link>
                    <Link
                      to="/profile"
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-ink-200 transition-colors hover:bg-white/[0.05] hover:text-ink-100"
                    >
                      <HiOutlineUser className="h-4 w-4 text-ink-400" />
                      Profile settings
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-2.5 rounded-lg border-t border-white/[0.06] px-3 py-2 pt-2.5 text-left text-[13px] text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                    >
                      <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            !isAuthPage && (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2 text-[13.5px] font-medium text-ink-300 transition-colors hover:bg-white/[0.04] hover:text-ink-100"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-[10px] bg-white px-3.5 py-2 text-[13px] font-semibold text-base-950 transition-colors hover:bg-ink-200"
                >
                  Get started
                </Link>
              </div>
            )
          )}

          {!isAuthPage && (
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="btn-icon md:hidden"
            >
              {menuOpen ? (
                <HiOutlineXMark className="h-5 w-5" />
              ) : (
                <HiOutlineBars3 className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {menuOpen && !isAuthPage && (
        <div
          id="mobile-nav"
          className="animate-fade-in border-t border-white/[0.06] bg-base-950/95 px-4 py-3 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {isLanding ? (
              <>
                <a
                  href="#how-it-works"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-200 hover:bg-white/[0.05]"
                >
                  How it works
                </a>
                <a
                  href="#models"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-200 hover:bg-white/[0.05]"
                >
                  Models
                </a>
                <a
                  href="#preview"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-200 hover:bg-white/[0.05]"
                >
                  Preview
                </a>
                <div className="my-2 h-px bg-white/[0.06]" />
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-200 hover:bg-white/[0.05]"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="mt-1 rounded-[10px] bg-white px-3 py-2.5 text-center text-sm font-semibold text-base-950"
                >
                  Get started free
                </Link>
              </>
            ) : user ? (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-200 hover:bg-white/[0.05]"
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-200 hover:bg-white/[0.05]"
                >
                  History
                </Link>
                <Link
                  to="/profile"
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-200 hover:bg-white/[0.05]"
                >
                  Profile settings
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10"
                >
                  <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
                  Log out
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
