import { useLayoutEffect, useRef } from "react";

/**
 * Arms a scroll reveal only after mount, so the default render stays visible
 * when JavaScript, IntersectionObserver, or motion is unavailable.
 */
export const useReveal = ({ threshold = 0.18 } = {}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced || !("IntersectionObserver" in window)) {
      node.classList.add("is-in");
      return undefined;
    }

    node.classList.add("is-armed");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};
