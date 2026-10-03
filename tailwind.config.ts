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
        rail: withVar("--c-rail"),
        railText: withVar("--c-rail-text"),
        railMuted: withVar("--c-rail-muted"),
        railBorder: withVar("--c-rail-border"),
        shipped: withVar("--c-shipped"),
        review: withVar("--c-review"),
        archived: withVar("--c-archived"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        // Legacy class names: condensed display, body, tiny meta.
        sora: ["var(--font-display)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        canvas: "1340px",
        prose: "72ch",
      },
      borderRadius: {
        none: "0px",
        sm: "6px",
        DEFAULT: "1rem",
        md: "1rem",
        lg: "1rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(.19, 1, .22, 1)",
      },
      transitionDuration: {
        reveal: "650ms",
        wipe: "500ms",
      },
      boxShadow: {
        card: "none",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.65s cubic-bezier(.19, 1, .22, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
