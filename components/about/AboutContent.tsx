"use client";

import Image from "next/image";
import { Avatar } from "@/components/ui/Avatar";
import { Timeline } from "@/components/about/Timeline";
import { CertBadge } from "@/components/about/CertBadge";
import { ToolsGrid } from "@/components/about/ToolsGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PullQuote } from "@/components/ui/PullQuote";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { certifications } from "@/data/certifications";
import { site } from "@/data/site";
import { media } from "@/data/media";
import { useT } from "@/lib/i18n";

export function AboutContent() {
  const { t } = useT();
  return (
    <div className="shell py-16 md:py-24">
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex items-center gap-6">
          {/* Drop a real photo at /public/images/profile.jpg then pass src="/images/profile.jpg" */}
          <Avatar alt={site.name} size={140} className="shrink-0" />
          <div>
            <h1 className="hero-title font-medium">
              {site.name}
            </h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {t.about.role} · {site.location}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="dt-card relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={media.about.src}
              alt={media.about.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <Reveal delay={0.15}>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
          {t.about.bio}
        </p>
      </Reveal>

      {/* Professional story */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.about.storyEyebrow} title={t.about.storyTitle} />
        <div className="mt-8">
          <Reveal>
            <PullQuote>{t.about.storyQuote}</PullQuote>
          </Reveal>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.about.expEyebrow} title={t.about.expTitle} />
        <div className="mt-10">
          <Timeline />
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.about.certEyebrow} title={t.about.certTitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="h-full">
              <CertBadge cert={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.about.toolsEyebrow} title={t.about.toolsTitle} />
        <div className="mt-10">
          <ToolsGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="dt-card mt-24 p-10 md:p-14">
        <Reveal>
          <h2 className="font-sans text-2xl font-medium tracking-[-0.03em] md:text-3xl">
            {t.about.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            {t.about.ctaDesc}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/resume" size="lg">
              {t.about.ctaResume}
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              {t.about.ctaContact}
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
