"use client";

import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/data/skills";
import { useT } from "@/lib/i18n";

export function ClientsBar() {
  const { t } = useT();
  return (
    <section className="border-y border-border">
      <div className="shell py-16 md:py-20">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accentSoft">03</span>
            <span aria-hidden className="text-primary/30">/</span>
            <span>{t.clients.heading}</span>
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
            {clients.map((c) => (
              <li
                key={c}
                className="font-sans text-lg font-medium tracking-tight text-primary/70 md:text-xl"
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
