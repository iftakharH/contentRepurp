import React, { useMemo, useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import Footer from "../components/Footer";
import { updateUserProfile } from "../services/api";
import { usePageTitle } from "../hooks/usePageTitle";

const Profile = ({ user, onUpdateUser }) => {
  usePageTitle("Profile settings");

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const initials = useMemo(
    () =>
      (user.name || "U")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join(""),
    [user.name]
  );

  const dirty =
    formData.name !== (user.name || "") ||
    formData.email !== (user.email || "") ||
    formData.password !== "";

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
    setSuccess(false);
  };

  const handleReset = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
    });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { data } = await updateUserProfile(formData);
      onUpdateUser(data);
      setSuccess(true);
      setFormData({
        name: data.name || formData.name,
        email: data.email || formData.email,
        password: "",
      });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "That change could not be saved. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div>
          <h1 className="font-display text-[28px] font-semibold tracking-display text-ink-100 sm:text-[32px]">
            Profile settings
          </h1>
          <p className="mt-1.5 text-[13.5px] text-ink-400">
            Manage the name, email, and password attached to your account.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 lg:grid-cols-[292px_minmax(0,1fr)]">
          <aside className="rounded-card border border-white/[0.07] bg-base-800 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-card bg-gradient-to-br from-primary-400 to-primary-700 text-[16px] font-bold text-white ring-1 ring-inset ring-white/20">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-ink-100">
                  {user.name}
                </p>
                <p className="truncate text-[11.5px] text-ink-400">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-white/[0.06] pt-4">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                  Status
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-ink-200">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-lime-500"
                    aria-hidden="true"
                  />
                  Signed in
                </p>
              </div>
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                  Plan
                </p>
                <p className="mt-1 text-[12px] text-ink-200">
                  Free · 5 generations / hour
                </p>
              </div>
            </div>

            <p className="mt-5 flex items-start gap-2 border-t border-white/[0.06] pt-4 text-[11px] leading-relaxed text-ink-500">
              <HiOutlineShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
              Drafts and history are tied to this account. Changing your email
              does not remove them.
            </p>
          </aside>

          <section className="overflow-hidden rounded-card border border-white/[0.07] bg-base-800">
            <form onSubmit={handleSubmit}>
              <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
                <h2 className="font-display text-[15px] font-semibold tracking-tighter text-ink-100">
                  Account details
                </h2>
                <p className="mt-0.5 text-[11.5px] text-ink-500">
                  This is what appears in the navigation bar.
                </p>
              </div>

              <div className="space-y-4 px-5 py-5 sm:px-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="field"
                      required
                    />
                  </div>

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
                      autoComplete="email"
                      className="field"
                      required
                    />
                  </div>
                </div>

                <div className="divider" />

                <div>
                  <label htmlFor="password" className="label">
                    New password{" "}
                    <span className="font-normal text-ink-500">
                      (leave blank to keep current)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      minLength={6}
                      className="field pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((shown) => !shown)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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
                  <p className="mt-2 text-[11px] text-ink-500">
                    You will stay signed in on this device after saving.
                  </p>
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

                {success && (
                  <div
                    role="status"
                    className="flex items-center gap-2 rounded-tile border border-lime-500/25 bg-lime-500/[0.06] px-3.5 py-2.5"
                  >
                    <HiOutlineCheckCircle className="h-4 w-4 shrink-0 text-lime-400" />
                    <p className="text-[12.5px] text-lime-200">
                      Profile updated successfully.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-base-850/50 px-5 py-4 sm:px-6">
                <p className="text-[11px] text-ink-500">
                  {dirty ? "You have unsaved changes." : "Everything is saved."}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={!dirty || loading}
                    className="btn-ghost px-3 py-2 text-[12.5px]"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !dirty}
                    className="btn-primary px-4 py-2 text-[12.5px]"
                  >
                    {loading ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Saving…
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>

      <Footer compact />
    </div>
  );
};

export default Profile;
