import React from "react";
import { Link, Navigate } from "react-router-dom";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";

const Landing = ({ user }) => {
  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Hero Content */}
      <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-primary-300 text-sm font-medium mb-4">
          <HiSparkles className="w-4 h-4" />
          <span>AI-Powered Content Repurposing</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-white pb-2">
          Transform One Piece of Content into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">Dozens</span>
        </h1>

        <p className="text-lg sm:text-xl text-dark-200 max-w-2xl mx-auto leading-relaxed">
          Stop writing from scratch. Turn your blog posts, videos, and articles into highly-engaging Twitter threads, LinkedIn posts, and more in seconds using AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            to="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started for Free
            <HiArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 glass hover:bg-white/10 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            Log In
          </Link>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full text-left">
        {[
          {
            title: "Multiple Platforms",
            desc: "Format perfectly for Twitter, LinkedIn, Instagram, Facebook, and Email newsletters.",
            icon: "📱",
          },
          {
            title: "Customizable Tones",
            desc: "Keep your brand voice. Choose from professional, casual, humorous, or inspirational tones.",
            icon: "🎭",
          },
          {
            title: "Bring Your Own Key",
            desc: "Connect your own OpenRouter API key to choose between GPT-4o, Claude 3.5 Sonnet, and more.",
            icon: "🔑",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="glass p-6 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-colors duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-dark-700 border border-white/5 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-dark-300 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
