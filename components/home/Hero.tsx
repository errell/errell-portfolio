"use client";

import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { useT } from "@/lib/i18n";

/**
 * Left-aligned headline, short lede, and a mono readout of facts already on
 * the site. CSS entrance only (animate-rise); reduced-motion disables it.
 */
export function Hero() {
  const { t } = useT();
  const rows = [
    { key: t.hero.roleKey, value: t.hero.titleAccent },
    { key: t.hero.yearsKey, value: t.hero.yearsValue },
    { key: t.hero.locationKey, value: site.location },
    { key: t.hero.focusKey, value: t.hero.subtitle },
  ];

  return (
    <section className="home-hero border-b border-border">
      <div className="shell grid items-end gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.72fr)] lg:gap-16">
        <div>
          <p className="eyebrow animate-rise">{t.hero.badge}</p>
          <h1 className="hero-title mt-5 max-w-3xl animate-rise [animation-delay:80ms]">
            <span className="block">{t.hero.titleA}</span>
            <span className="mt-1 block text-primary">{t.hero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl animate-rise text-base leading-relaxed text-muted [animation-delay:140ms] md:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:180ms] sm:flex-row sm:items-center">
            <Button href="/work" size="lg">
              {t.hero.viewWork}
            </Button>
            <Button href="/contact" size="lg" variant="ghost">
              {t.hero.contact}
            </Button>
          </div>
        </div>

        <aside className="dt-panel animate-rise p-5 [animation-delay:200ms] md:p-6">
          <p className="eyebrow">{t.hero.readout}</p>
          <dl className="mt-2">
            {rows.map((row) => (
              <div
                key={row.key}
                className="flex items-baseline justify-between gap-6 border-t border-border py-3 first:border-t-0"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {row.key}
                </dt>
                <dd className="text-right text-sm text-primary">{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
