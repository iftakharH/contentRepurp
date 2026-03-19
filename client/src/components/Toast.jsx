import React, { useEffect, useState } from "react";
import { HiExclamationCircle, HiCheckCircle, HiXMark } from "react-icons/hi2";

const Toast = ({ title, message, suggestion, type = "error", onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsVisible(true), 10);
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  const isError = type === "error";

  return (
    <div
      className={`fixed bottom-6 right-6 max-w-sm w-full z-50 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <div className={`rounded-xl p-4 shadow-2xl border backdrop-blur-md ${
        isError ? "bg-red-500/10 border-red-500/20 text-red-100" : "bg-green-500/10 border-green-500/20 text-green-100"
      }`}>
        <div className="flex items-start gap-3 relative">
          <div className="shrink-0 mt-0.5">
            {isError ? (
              <HiExclamationCircle className="w-6 h-6 text-red-400" />
            ) : (
              <HiCheckCircle className="w-6 h-6 text-green-400" />
            )}
          </div>
          <div className="flex-1 pr-6">
            <h3 className={`font-semibold text-sm mb-1 ${isError ? "text-red-300" : "text-green-300"}`}>
              {title}
            </h3>
            <p className="text-sm opacity-90 leading-snug mb-2 whitespace-pre-wrap">{message}</p>
            {suggestion && (
              <div className={`text-xs font-medium p-2 rounded-lg mt-2 inline-block ${
                isError ? "bg-red-500/20 text-red-200" : "bg-green-500/20 text-green-200"
              }`}>
                💡 {suggestion}
              </div>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className={`absolute top-0 right-0 p-1 rounded-md transition-colors ${
              isError ? "hover:bg-red-500/20 text-red-400" : "hover:bg-green-500/20 text-green-400"
            }`}
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
