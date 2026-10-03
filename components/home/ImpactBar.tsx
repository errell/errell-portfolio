"use client";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { Reveal } from "@/components/ui/Reveal";
import { impactMetrics } from "@/data/impact-metrics";
import { useT } from "@/lib/i18n";

export function ImpactBar() {
  const { t } = useT();

  return (
    <section aria-label={t.impact.eyebrow} className="border-b border-border">
      <div className="shell py-10 md:py-12">
        <Reveal>
          <p className="eyebrow">{t.impact.eyebrow}</p>
        </Reveal>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {impactMetrics.map((m, i) => {
            const label = t.impact.labels[i];
            return (
              <Reveal key={i} delay={i * 0.04}>
                <dt className="sr-only">{label}</dt>
                <dd className="text-3xl font-semibold tracking-[-0.02em] text-primary md:text-4xl">
                  <AnimatedNumber
                    value={m.countTo ?? 0}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals ?? 0}
                  />
                </dd>
                <p className="mt-3 inline-flex items-start font-mono text-xs leading-snug text-muted">
                  <span>{label}</span>
                  {m.tooltip ? (
                    <InfoTooltip text={m.tooltip} label={`What is ${label}?`} />
                  ) : null}
                </p>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
