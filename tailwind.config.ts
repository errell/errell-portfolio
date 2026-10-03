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
        amber: withVar("--c-amber"),
        onAccent: withVar("--c-on-accent"),
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
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseDot: "pulseDot 2s ease-in-out infinite",
        rise: "rise 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
