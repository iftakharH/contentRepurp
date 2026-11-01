import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineExclamationTriangle,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import LiveDemo from "../components/LiveDemo";
import { LogoMark } from "../components/Logo";
import { loginUser, registerUser } from "../services/api";
import { usePageTitle } from "../hooks/usePageTitle";

const Login = ({ onLogin, defaultIsRegister = false }) => {
  const [isRegister, setIsRegister] = useState(defaultIsRegister);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  usePageTitle(isRegister ? "Create account" : "Log in");

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    if (error) setError("");
  };

  const switchMode = () => {
    setIsRegister((current) => !current);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = isRegister
        ? await registerUser(formData)
        : await loginUser({
            email: formData.email,
            password: formData.password,
          });
      onLogin(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "That did not work. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col px-4 py-8 sm:px-6 lg:px-12 lg:py-12">
        <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center">
          <Link
            to="/"
            className="mb-8 inline-flex w-fit items-center gap-1.5 text-[12px] font-medium text-ink-500 transition-colors hover:text-ink-200"
          >
            <HiOutlineArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>

          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10 rounded-xl" />
            <div>
              <h1 className="font-display text-[26px] font-semibold leading-tight tracking-display text-ink-100">
                {isRegister ? "Create your account" : "Welcome back"}
              </h1>
              <p className="mt-0.5 text-[12.5px] text-ink-400">
                {isRegister
                  ? "Free models included. No key required."
                  : "Sign in to keep repurposing."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {isRegister && (
              <div className="animate-fade-in">
                <label htmlFor="name" className="label">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="field"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                autoComplete="email"
                inputMode="email"
                className="field"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  minLength={6}
                  className="field pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-ink-500 transition-colors hover:bg-white/[0.05] hover:text-ink-200"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="h-4 w-4" />
                  ) : (
                    <HiOutlineEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-tile border border-red-500/25 bg-red-500/[0.06] px-3.5 py-2.5"
              >
                <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-[12.5px] leading-relaxed text-red-200">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary group w-full py-3.5"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {isRegister ? "Creating account…" : "Signing in…"}
                </>
              ) : (
                <>
                  {isRegister ? "Create account" : "Sign in"}
                  <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[12.5px] text-ink-400">
            {isRegister
              ? "Already have an account?"
              : "New to contentRepurp?"}{" "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-primary-300 transition-colors hover:text-primary-200"
            >
              {isRegister ? "Sign in" : "Create one free"}
            </button>
          </p>

          <p className="mt-8 border-t border-white/[0.06] pt-4 text-[11px] leading-relaxed text-ink-500">
            By continuing you agree to use contentRepurp responsibly. Generated
            drafts are saved to your account so you can find them in History.
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-l border-white/[0.06] bg-base-900 lg:flex lg:items-center lg:justify-center lg:p-10">
        <div
          className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-primary-600/[0.18] blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#241b3f]/60 blur-[90px]"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-md">
          <p className="font-display text-[24px] font-semibold leading-tight tracking-display text-ink-100">
            The draft you already wrote is enough.
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-ink-400">
            One source becomes a post, a thread, and an email. Pick the room,
            keep the argument.
          </p>

          <div className="mt-7">
            <LiveDemo autoPlay={false} compact />
          </div>

          <ul className="mt-6 space-y-2">
            {[
              "Free models, no API key needed",
              "Your history stays attached to your account",
              "Bring your own OpenRouter key any time",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[12px] text-ink-300"
              >
                <HiOutlineCheck className="h-3.5 w-3.5 text-lime-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
