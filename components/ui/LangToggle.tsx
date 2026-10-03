"use client";

import { useT, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "tl", label: "TL" },
];

export function LangToggle() {
  const { lang, setLang, t } = useT();
  const idle = "text-muted hover:text-primary";

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="inline-flex items-center rounded-full border border-border p-0.5"
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
              "rounded-full px-2 py-1 text-[11px] font-semibold tracking-wide transition-colors duration-150",
              active ? "bg-accent text-white" : idle,
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
