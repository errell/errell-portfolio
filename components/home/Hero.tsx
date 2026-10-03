"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { media } from "@/data/media";

/**
 * Hero uses CSS entrance animations (animate-rise + staggered delays) — pure
 * CSS avoids SSR hydration mismatches on this LCP-critical section, and the
 * global reduced-motion rule disables it for users who prefer less motion.
 * Two-column on desktop (copy + framed stock image), stacked on mobile.
 */
export function Hero() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="dot-grid grid-fade absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-10%] -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-canvas grid-cols-1 items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        {/* Copy */}
        <div className="max-w-2xl">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-primary/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-green-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {t.hero.badge}
            </span>
          </div>

          <h1 className="mt-6 animate-rise font-sora text-4xl font-bold leading-[1.05] tracking-tight [animation-delay:120ms] sm:text-5xl md:text-6xl">
            {t.hero.titleA} <span className="text-gradient">{t.hero.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl animate-rise font-mono text-sm text-primary/60 [animation-delay:240ms] sm:text-base">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:items-center">
            <Button href="/work" size="lg">
              {t.hero.viewWork}
              <span aria-hidden>→</span>
            </Button>
            <Button href="/errell-nino-cv.pdf" size="lg" variant="secondary">
              {t.hero.downloadCV}
            </Button>
          </div>
        </div>

        {/* Framed stock image */}
        <div className="animate-rise [animation-delay:200ms]">
          <div className="img-overlay relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border shadow-2xl sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src={media.hero.src}
              alt={media.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
