"use client";

import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

/**
 * Light-first marketing hero. CSS entrance only (animate-rise); the global
 * reduced-motion rule disables it.
 */
export function Hero() {
  const { t } = useT();

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-canvas px-5 py-24 md:px-8 md:py-32">
        <p className="eyebrow animate-rise">{t.hero.badge}</p>
        <h1 className="mt-4 max-w-4xl animate-rise font-sora text-5xl font-semibold leading-[1.05] tracking-tight [animation-delay:80ms] sm:text-6xl md:text-7xl">
          {t.hero.titleA}
        </h1>
        <p className="mt-5 animate-rise font-sora text-2xl font-semibold tracking-tight text-primary [animation-delay:120ms] md:text-3xl">
          {t.hero.titleAccent}
        </p>
        <p className="mt-3 animate-rise text-lg text-muted [animation-delay:160ms]">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:200ms] sm:flex-row sm:items-center">
          <Button href="/work" size="lg">
            {t.hero.viewWork}
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            {t.hero.contact}
          </Button>
        </div>
      </div>
    </section>
  );
}
