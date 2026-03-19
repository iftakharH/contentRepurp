import React, { useState, useEffect } from "react";
import { HiSparkles, HiDocumentText } from "react-icons/hi2";
import InputForm from "../components/InputForm";
import OutputCard from "../components/OutputCard";
import {
  repurposeContent,
  getUserContent,
  deleteContent,
} from "../services/api";

const Dashboard = ({ user }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

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
      alert(error.response?.data?.message || "Failed to repurpose content");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          Welcome back,{" "}
          <span className="gradient-text">{user.name}</span> 👋
        </h1>
        <p className="text-dark-200">
          Transform your content for any platform in seconds
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <HiSparkles className="w-5 h-5 text-primary-400" />
              <h2 className="text-lg font-semibold text-white">
                Repurpose Content
              </h2>
            </div>
            <InputForm onSubmit={handleRepurpose} loading={loading} />
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-5">
            <HiDocumentText className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">
              Your Content
            </h2>
            <span className="text-xs text-dark-300 bg-dark-600 px-2 py-0.5 rounded-full">
              {contents.length}
            </span>
          </div>

          {fetchLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : contents.length > 0 ? (
            <div className="space-y-4">
              {contents.map((content) => (
                <OutputCard
                  key={content._id}
                  content={content}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-dark-600 mb-4">
                <HiDocumentText className="w-8 h-8 text-dark-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No content yet
              </h3>
              <p className="text-dark-300 text-sm max-w-sm mx-auto">
                Paste your content on the left and choose a platform to start
                repurposing with AI
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
