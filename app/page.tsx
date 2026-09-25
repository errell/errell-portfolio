"use client";

import { Hero } from "@/components/home/Hero";
import { ImpactBar } from "@/components/home/ImpactBar";
import { CaseStudyCard } from "@/components/home/CaseStudyCard";
import { SkillsGrid } from "@/components/home/SkillsGrid";
import { ClientsBar } from "@/components/home/ClientsBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/data/case-studies";
import { useT } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useT();
  return (
    <>
      <Hero />
      <ImpactBar />

      {/* Case study previews */}
      <section className="mx-auto max-w-canvas px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow={t.home.workEyebrow}
          title={t.home.workTitle}
          description={t.home.workDesc}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.1} as="div" className="h-full">
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-border bg-surface/20">
        <div className="mx-auto max-w-canvas px-5 py-20 md:px-8 md:py-28">
          <SectionHeading eyebrow={t.home.capsEyebrow} title={t.home.capsTitle} />
          <div className="mt-12">
            <SkillsGrid />
          </div>
        </div>
      </section>

      <ClientsBar />

      {/* Footer CTA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
        />
        <div className="mx-auto max-w-canvas px-5 py-24 text-center md:px-8 md:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-sora text-3xl font-bold tracking-tight md:text-5xl">
              {t.home.ctaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-primary/60">
              {t.home.ctaDesc}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                {t.home.ctaPrimary}
                <span aria-hidden>→</span>
              </Button>
              <Button href="/work" size="lg" variant="secondary">
                {t.home.ctaSecondary}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
