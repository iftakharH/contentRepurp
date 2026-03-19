import React, { useState, useEffect } from "react";
import { getHistory, repurposeContent } from "../services/api";
import { HiDocumentText, HiOutlineClipboardDocument, HiOutlineArrowPath } from "react-icons/hi2";

const History = ({ user }) => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [regeneratingId, setRegeneratingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const { data } = await getHistory();
      setHistoryList(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = async (item) => {
    try {
      setRegeneratingId(item._id);
      await repurposeContent({
        originalContent: item.originalContent,
        platform: item.platform,
        tone: item.tone,
        model: item.model,
      });
      // Replace the old item in the list with the newly generated one, or simply refresh
      await fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Failed to regenerate content.");
    } finally {
      setRegeneratingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-dark-200">
          Your History
        </h1>
        <p className="mt-2 text-dark-200">
          View and manage all your previously generated content.
        </p>
      </div>

      {error && (
        <div className="glass bg-red-500/10 border-red-500/20 text-red-200 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {historyList.length === 0 && !error ? (
        <div className="glass rounded-2xl p-12 text-center">
          <HiDocumentText className="w-16 h-16 mx-auto text-dark-400 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No history yet</h3>
          <p className="text-dark-200">
            Head over to the Dashboard to start repurposing your content.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {historyList.map((item) => (
            <div key={item._id} className="glass rounded-xl overflow-hidden border border-white/5 transition-all hover:border-white/10">
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300 capitalize border border-primary-500/20">
                    {item.platform}
                  </span>
                  <span className="text-xs text-dark-300">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(item._id, item.repurposedContent)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-dark-100 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 hover:border-white/10"
                  >
                    <HiOutlineClipboardDocument className="w-4 h-4" />
                    {copiedId === item._id ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => handleRegenerate(item)}
                    disabled={regeneratingId === item._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 rounded-lg transition-colors border border-primary-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiOutlineArrowPath className={regeneratingId === item._id ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
                    {regeneratingId === item._id ? "Regenerating..." : "Regenerate"}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-dark-100 whitespace-pre-wrap text-sm leading-relaxed">
                  {item.repurposedContent}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
