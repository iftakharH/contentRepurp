import { useEffect } from "react";

export const usePageTitle = (title) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · contentRepurp` : "contentRepurp";
    return () => {
      document.title = previous;
    };
  }, [title]);
};
