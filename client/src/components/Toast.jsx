import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXMark,
} from "react-icons/hi2";

const Toast = ({
  title,
  message,
  suggestion,
  type = "error",
  duration = 8000,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const onCloseRef = useRef(onClose);
  const closeTimer = useRef(null);

  const isError = type === "error";

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => setVisible(false), duration);
    const remove = setTimeout(() => onCloseRef.current(), duration + 240);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hide);
      clearTimeout(remove);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [duration]);

  const handleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setVisible(false);
    closeTimer.current = setTimeout(() => onCloseRef.current(), 220);
  };

  return (
    <div
      className={`fixed inset-x-4 bottom-4 z-[60] transition-all duration-300 ease-out sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-full sm:max-w-sm ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div
        role={isError ? "alert" : "status"}
        className={`overflow-hidden rounded-card border shadow-panel ${
          isError
            ? "border-red-500/25 bg-[#1a0f12]"
            : "border-lime-500/25 bg-[#101508]"
        }`}
      >
        <div className="flex items-start gap-3 p-4">
          <span
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              isError
                ? "bg-red-500/[0.12] text-red-400"
                : "bg-lime-500/[0.12] text-lime-400"
            }`}
          >
            {isError ? (
              <HiOutlineExclamationTriangle className="h-[18px] w-[18px]" />
            ) : (
              <HiOutlineCheckCircle className="h-[18px] w-[18px]" />
            )}
          </span>

          <div className="min-w-0 flex-1 pr-4">
            <p
              className={`text-[13.5px] font-semibold ${
                isError ? "text-red-200" : "text-lime-200"
              }`}
            >
              {title}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-[12.5px] leading-relaxed text-ink-300">
              {message}
            </p>
            {suggestion && (
              <p className="mt-2 border-t border-white/[0.07] pt-2 text-[11.5px] leading-relaxed text-ink-400">
                {suggestion}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Dismiss notification"
            className="shrink-0 rounded-md p-1 text-ink-400 transition-colors hover:bg-white/[0.06] hover:text-ink-100"
          >
            <HiOutlineXMark className="h-4 w-4" />
          </button>
        </div>

        <div className="h-[2px] w-full bg-white/[0.06]">
          <div
            className={`h-full origin-left animate-toast-progress ${
              isError ? "bg-red-400/70" : "bg-lime-400/70"
            }`}
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
