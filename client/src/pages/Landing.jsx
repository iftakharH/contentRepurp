import React from "react";
import { Link, Navigate } from "react-router-dom";
import { HiSparkles, HiArrowRight, HiBolt, HiChartBar, HiFaceSmile } from "react-icons/hi2";

const Landing = ({ user }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans overflow-x-hidden relative">
      {/* Background Decorative Blobs - Increased color richness */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-600/30 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="fixed top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/30 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[20%] w-[60vw] h-[40vw] bg-blue-500/20 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary-300 text-sm font-semibold mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <HiSparkles className="w-4 h-4" />
          <span>Transform Content at Scale with contentRepurp</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-white pb-6 max-w-5xl leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Maximize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">Audience</span> With One Click.
        </h1>

        <p className="text-lg sm:text-2xl text-dark-200 max-w-3xl mx-auto leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Turn a single blog post or video script into a week's worth of LinkedIn posts, Twitter threads, and newsletters. Stop writing from scratch.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link
            to="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white text-lg font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-[0_0_40px_-10px] shadow-primary-500/50 hover:shadow-primary-500/80 hover:-translate-y-1"
          >
            Get Started Free
            <HiArrowRight className="w-6 h-6" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-dark-800/50 hover:bg-dark-700 text-white text-lg font-bold py-4 px-10 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20 backdrop-blur-md"
          >
            Login
          </Link>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">How contentRepurp Works</h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">Three simple steps to build your content engine. We handle the formatting, tone, and delivery automatically.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Paste Content",
              desc: "Paste your existing long-form content, such as a blog post, YouTube transcript, or newsletter.",
              icon: <HiBolt className="w-8 h-8" />
            },
            {
              step: "02",
              title: "Select Settings",
              desc: "Choose your target platform (Twitter, LinkedIn, Instagram) and define the perfect tone of voice.",
              icon: <HiFaceSmile className="w-8 h-8" />
            },
            {
              step: "03",
              title: "Generate & Post",
              desc: "Instantly receive optimized content formatted with hashtags and emojis ready to be published.",
              icon: <HiChartBar className="w-8 h-8" />
            }
          ].map((item, i) => (
            <div key={i} className="bg-dark-800/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 group hover:-translate-y-2">
              <div className="text-primary-500 text-5xl font-black mb-6 opacity-20 group-hover:opacity-40 transition-opacity">{item.step}</div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center text-primary-300 mb-6 border border-white/5">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-dark-200 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof / Benefit Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Bring your own <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">OpenRouter API</span> Keys.
            </h2>
            <p className="text-lg text-dark-200 leading-relaxed">
              We give you full control. Use our default models for free, or plug in your own OpenRouter credentials to generate unlimited content using cutting-edge models like GPT-4o, Claude 3.5 Sonnet, and Gemini 2.0 without any markups.
            </p>
            <ul className="space-y-4">
              {[
                "Unlimited generations with custom keys",
                "10+ top-tier AI models supported",
                "Zero markup on your API costs",
                "Full privacy - keys are never stored permanently"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">✓</div>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-md bg-dark-800/60 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-[2rem] pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-white font-bold">Select Model</span>
                  <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-300 rounded-lg">Custom Key Live</span>
                </div>
                {['GPT-4o (OpenAI)', 'Claude 3.5 Sonnet', 'Gemini 2.0 Flash'].map((model, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${i === 1 ? 'bg-primary-600/20 border-primary-500/50' : 'bg-dark-700/50 border-white/5'} flex items-center justify-between`}>
                    <span className="text-sm font-medium text-white">{model}</span>
                    {i === 1 && <span className="w-2 h-2 rounded-full bg-primary-400" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 p-12 sm:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 relative z-10">Ready to scale your content?</h2>
          <p className="text-xl text-dark-200 mb-10 max-w-2xl mx-auto relative z-10">Join creators and marketers who are saving hours every week with contentRepurp.</p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-dark-900 hover:bg-white/90 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 relative z-10 text-lg"
          >
            Start Repurposing Now
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-dark-400 text-sm relative z-10">
        <p>© {new Date().getFullYear()} contentRepurp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
