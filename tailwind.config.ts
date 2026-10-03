import type { Config } from "tailwindcss";

// Colors are driven by CSS variables (space-separated RGB channels) defined in
// styles/globals.css, so a single class flip on <html> (.dark / .light)
// re-themes the entire site — and /opacity modifiers still work via
// <alpha-value>.
const withVar = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: withVar("--c-base"),
        surface: withVar("--c-surface"),
        elevated: withVar("--c-elevated"),
        border: "rgb(var(--c-line) / var(--c-line-a))",
        primary: withVar("--c-primary"),
        accent: withVar("--c-accent"),
        accentSoft: withVar("--c-accent-soft"),
        link: withVar("--c-link"),
        muted: withVar("--c-muted"),
        onAccent: withVar("--c-on-accent"),
        shipped: withVar("--c-shipped"),
        review: withVar("--c-review"),
        archived: withVar("--c-archived"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Legacy class names now resolve to Inter.
        sora: ["var(--font-inter)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        canvas: "1120px",
        prose: "72ch",
      },
      borderRadius: {
        none: "0px",
        sm: "6px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(.19, 1, .22, 1)",
      },
      transitionDuration: {
        reveal: "450ms",
      },
      boxShadow: {
        card: "0 16px 40px rgb(17 17 17 / 0.06)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.45s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
