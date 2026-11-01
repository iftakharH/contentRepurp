/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#dbe4ff",
          200: "#bac8ff",
          300: "#91a7ff",
          400: "#748ffc",
          500: "#5c7cfa",
          600: "#4c6ef5",
          700: "#4263eb",
          800: "#3b5bdb",
          900: "#364fc7",
        },
        dark: {
          50: "#c1c2c5",
          100: "#a6a7ab",
          200: "#909296",
          300: "#5c5f66",
          400: "#373a40",
          500: "#2c2e33",
          600: "#25262b",
          700: "#1a1b1e",
          800: "#141517",
          900: "#101113",
        },
        base: {
          950: "#07070a",
          900: "#0a0a0f",
          850: "#0c0c12",
          800: "#111118",
          750: "#15151e",
          700: "#1b1b25",
          600: "#23232f",
          500: "#2e2e3c",
        },
        ink: {
          100: "#f5f5f9",
          200: "#dcdce6",
          300: "#b4b4c6",
          400: "#8e8ea3",
          500: "#7d7d93",
        },
        lime: {
          300: "#e6ff9e",
          400: "#d5fa6e",
          500: "#c2ec4c",
          600: "#a3cf2c",
        },
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk"', "system-ui", "sans-serif"],
        display: [
          '"Bricolage Grotesque"',
          '"Schibsted Grotesk"',
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        display: "-0.03em",
        tighter: "-0.02em",
      },
      borderRadius: {
        tile: "0.875rem",
        card: "1.125rem",
        panel: "1.5rem",
      },
      boxShadow: {
        lift: "0 18px 40px -26px rgba(0, 0, 0, 0.95), 0 2px 6px -3px rgba(0, 0, 0, 0.6)",
        panel: "0 32px 80px -40px rgba(0, 0, 0, 1), 0 4px 12px -6px rgba(0, 0, 0, 0.7)",
        inset: "inset 0 1px 0 0 rgba(255, 255, 255, 0.04)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        inout: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "translateY(4px) scale(0.99)" },
          to: { opacity: "1", transform: "none" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "toast-progress": {
          from: { transform: "scaleX(1)" },
          to: { transform: "scaleX(0)" },
        },
        "caret-blink": {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 240ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-up": "fade-up 480ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "pop-in": "pop-in 320ms cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 1.6s linear infinite",
        "toast-progress": "toast-progress 8s linear forwards",
        "caret-blink": "caret-blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};
