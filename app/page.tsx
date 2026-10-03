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

      <section className="shell py-12 md:py-14">
        <SectionHeading
          index="01"
          eyebrow={t.home.workEyebrow}
          title={t.home.workTitle}
          description={t.home.workDesc}
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.05} as="div" className="h-full">
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="shell py-12 md:py-14">
          <SectionHeading index="02" eyebrow={t.home.capsEyebrow} title={t.home.capsTitle} />
          <div className="mt-8">
            <SkillsGrid />
          </div>
        </div>
      </section>

      <ClientsBar />

      <section className="border-t border-border">
        <div className="shell py-12 md:py-14">
          <Reveal>
            <p className="eyebrow">04</p>
            <h2 className="mt-2 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
              {t.home.ctaTitle}
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted">
              {t.home.ctaDesc}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                {t.home.ctaPrimary}
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
