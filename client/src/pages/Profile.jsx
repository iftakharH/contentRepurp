import React, { useState } from "react";
import { HiUser, HiCheck, HiExclamationTriangle } from "react-icons/hi2";
import { updateUserProfile } from "../services/api";

const Profile = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { data } = await updateUserProfile(formData);
      onUpdateUser(data); // update global App state and localStorage
      setSuccess(true);
      setFormData((prev) => ({ ...prev, password: "" })); // clear password field
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
          <HiUser className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <p className="text-sm text-dark-200">Manage your account details and password</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-100 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-100 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
              required
            />
          </div>

          <hr className="border-white/5" />

          <div>
            <label className="block text-sm font-medium text-dark-100 mb-2">
              New Password <span className="text-dark-300 font-normal">(Leave blank to keep current)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              minLength={6}
              className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
              <HiExclamationTriangle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl px-4 py-3">
              <HiCheck className="w-5 h-5 shrink-0" />
              Profile updated successfully!
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-primary-500/25"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
