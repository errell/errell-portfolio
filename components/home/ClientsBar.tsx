"use client";

import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/data/skills";
import { useT } from "@/lib/i18n";

export function ClientsBar() {
  const { t } = useT();
  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-canvas px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <p className="eyebrow">{t.clients.heading}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
            {clients.map((c) => (
              <li
                key={c}
                className="font-sora text-lg font-semibold text-primary/70 md:text-xl"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 text-xs text-muted">{t.clients.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
