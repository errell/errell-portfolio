"use client";

import { useT, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "tl", label: "TL" },
];

export function LangToggle({ tone = "canvas" }: { tone?: "canvas" | "rail" }) {
  const { lang, setLang, t } = useT();
  const idle =
    tone === "rail"
      ? "text-railMuted hover:text-railText"
      : "text-muted hover:text-primary";

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5",
        tone === "rail" ? "border-railBorder" : "border-border",
      )}
    >
      {options.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setLang(o.value)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide transition-colors duration-150",
              active ? "bg-accent text-onAccent" : idle,
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
