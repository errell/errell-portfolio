"use client";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";
import { impactMetrics } from "@/data/impact-metrics";
import { useT } from "@/lib/i18n";

export function ImpactBar() {
  const { t } = useT();

  return (
    <section
      aria-label={t.impact.eyebrow}
      className="border-y border-border bg-surface/40"
    >
      <div className="mx-auto max-w-canvas px-5 py-14 md:px-8 md:py-16">
        <Reveal>
          <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-primary/40">
            {t.impact.eyebrow}
          </p>
        </Reveal>
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {impactMetrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.08} className="text-center">
              <dt className="sr-only">{t.impact.labels[i]}</dt>
              <dd className="font-mono text-3xl font-bold text-amber md:text-4xl">
                <AnimatedNumber
                  value={m.countTo ?? 0}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals ?? 0}
                />
              </dd>
              <p className="mt-2 text-xs leading-snug text-primary/60 md:text-sm">
                {t.impact.labels[i]}
              </p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
