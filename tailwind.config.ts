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
        border: withVar("--c-border"),
        primary: withVar("--c-primary"),
        accent: withVar("--c-accent"),
        muted: withVar("--c-muted"),
        onAccent: withVar("--c-on-accent"),
        rail: withVar("--c-rail"),
        railText: withVar("--c-rail-text"),
        railMuted: withVar("--c-rail-muted"),
        railBorder: withVar("--c-rail-border"),
        shipped: withVar("--c-shipped"),
        review: withVar("--c-review"),
        archived: withVar("--c-archived"),
      },
      fontFamily: {
        sora: ["var(--font-sora)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        canvas: "1200px",
        prose: "72ch",
      },
      boxShadow: {
        card: "0 8px 24px rgba(18, 21, 28, 0.06)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
