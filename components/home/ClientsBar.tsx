"use client";

import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/data/skills";
import { useT } from "@/lib/i18n";

export function ClientsBar() {
  const { t } = useT();
  return (
    <section className="border-y border-border bg-surface/30">
      <div className="mx-auto max-w-canvas px-5 py-12 md:px-8">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/40">
            {t.clients.heading}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {clients.map((c) => (
              <li
                key={c}
                className="font-sora text-lg font-semibold text-primary/45 transition-colors hover:text-primary/80 md:text-xl"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-xs text-primary/35">
            {t.clients.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
