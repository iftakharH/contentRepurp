import React, { useState, useEffect } from "react";

import InputForm from "../components/InputForm";
import OutputCard from "../components/OutputCard";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import {
  repurposeContent,
  getUserContent,
  deleteContent,
} from "../services/api";

const Dashboard = ({ user }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (title, message, suggestion, type = "error") => {
    setToast({ title, message, suggestion, type });
    // Auto-dismiss after 8 seconds
    setTimeout(() => setToast(null), 8000);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await getUserContent();
      setContents(res.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleRepurpose = async (data) => {
    setLoading(true);
    try {
      const res = await repurposeContent(data);
      setContents([res.data, ...contents]);
    } catch (error) {
      console.error("Error repurposing content:", error);
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Failed to repurpose content";

      if (status === 429) {
        showToast(
          "Rate Limit Exceeded",
          "This free AI provider is currently overloaded or out of capacity.",
          "Please click 'Change model' in the left panel and pick a different free model, or simply try again in a minute.",
          "error"
        );
      } else {
        showToast("Error Occurred", msg, "Please check your inputs and try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContent(id);
      setContents(contents.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-64px)] overflow-x-hidden lg:overflow-hidden bg-dark-900 relative flex flex-col">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:min-h-0">
        
        {/* Left Column: Input Form */}
        <div className="w-full lg:w-[450px] xl:w-[500px] shrink-0 lg:h-full flex flex-col mb-12 lg:mb-0">
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Dashboard
            </h1>
            <p className="text-dark-200">
              Welcome back,{" "}
              <span className="text-primary-400 font-medium">{user.name}</span>
            </p>
          </div>

          <div className="glass rounded-2xl p-6 lg:flex-1 lg:overflow-y-auto custom-scrollbar shadow-xl border-white/5">
            <InputForm onSubmit={handleRepurpose} loading={loading} />
          </div>
        </div>

        {/* Right Column: Output Cards */}
        <div className="flex-1 lg:h-full flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-6 shrink-0 pl-1">
            <h2 className="text-xl font-bold text-white">Your Contents</h2>
            <span className="text-sm text-dark-300 bg-dark-800 px-3 py-1 rounded-full border border-white/5">
              {contents.length} items
            </span>
          </div>

          <div className="flex-1 lg:overflow-y-auto custom-scrollbar lg:pr-2 pb-8">
            {fetchLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : contents.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-dark-300 p-8 text-center glass rounded-2xl border-white/5 min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <p className="text-lg font-medium text-white mb-2">
                  No content yet
                </p>
                <p className="text-sm">
                  Use the left panel to repurpose your first piece of content!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 auto-rows-max">
                {contents.map((content) => (
                  <OutputCard
                    key={content._id}
                    content={content}
                    onDelete={() => handleDelete(content._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {toast && (
        <Toast 
          title={toast.title} 
          message={toast.message} 
          suggestion={toast.suggestion} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Dashboard;
