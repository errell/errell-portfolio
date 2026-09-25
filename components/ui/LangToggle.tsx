"use client";

import { useT, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "tl", label: "TL" },
];

export function LangToggle() {
  const { lang, setLang, t } = useT();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="inline-flex items-center rounded-lg border border-border bg-surface/60 p-0.5"
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
              "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
              active
                ? "bg-accent text-onAccent"
                : "text-primary/60 hover:text-primary",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
