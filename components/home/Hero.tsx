"use client";

import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { useT } from "@/lib/i18n";

/**
 * Large left-aligned headline, short lede, one blue action, and a quiet
 * second action. Facts below reuse copy already on the site.
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
      <div className="shell py-20 md:py-28 lg:py-32">
        <p className="eyebrow animate-rise">{t.hero.badge}</p>
        <h1 className="hero-title mt-6 max-w-4xl animate-rise [animation-delay:80ms]">
          <span className="block">{t.hero.titleA}</span>
          <span className="mt-2 block text-primary">{t.hero.titleAccent}</span>
        </h1>
        <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-muted [animation-delay:140ms] md:text-xl">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:180ms] sm:flex-row sm:items-center">
          <Button href="/work" size="lg">
            {t.hero.viewWork}
          </Button>
          <Button href="/contact" size="lg" variant="ghost">
            {t.hero.contact}
          </Button>
        </div>

        <dl className="mt-16 grid animate-rise gap-8 border-t border-border pt-8 [animation-delay:220ms] sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => (
            <div key={row.key}>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {row.key}
              </dt>
              <dd className="mt-2 text-base text-primary">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
