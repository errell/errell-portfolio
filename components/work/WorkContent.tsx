"use client";

import { CaseStudyCard } from "@/components/home/CaseStudyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { caseStudies } from "@/data/case-studies";
import { useT } from "@/lib/i18n";

export function WorkContent() {
  const { t } = useT();
  return (
    <div className="mx-auto max-w-canvas px-5 py-16 md:px-8 md:py-24">
      <SectionHeading
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        description={t.work.desc}
      />

      <Reveal delay={0.1}>
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label={t.work.eyebrow}
        >
          {t.work.filters.map((f, i) => (
            <Tag key={f} variant={i === 0 ? "accent" : "default"}>
              {f}
            </Tag>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug} delay={i * 0.1} className="h-full">
            <CaseStudyCard study={study} expanded />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
