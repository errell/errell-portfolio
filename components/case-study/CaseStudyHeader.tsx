"use client";

import Image from "next/image";
import type { CaseStudy } from "@/types/case-study";
import { Tag } from "@/components/ui/Tag";
import { MetricCard } from "./MetricCard";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";
import { caseImages } from "@/data/media";

export function CaseStudyHeader({ study }: { study: CaseStudy }) {
  const { t } = useT();
  const slug = study.slug as keyof typeof t.caseStudies;
  const localized = t.caseStudies[slug] ?? {
    title: study.title,
    subtitle: study.subtitle,
  };
  const img = caseImages[study.slug];

  return (
    <header className="border-b border-border">
      <div className="shell py-10 md:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {t.caseStudy.label} {study.number}
              </span>
              {study.tags.map((tag) => (
                <Tag key={tag} variant="outline">
                  {tag}
                </Tag>
              ))}
            </div>

            <h1 className="hero-title mt-5">
              {localized.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {localized.subtitle}
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 font-mono text-xs sm:grid-cols-3">
              <div>
                <dt className="uppercase tracking-wider text-muted">
                  {t.caseStudy.industry}
                </dt>
                <dd className="mt-1 text-primary/80">{study.industry}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-wider text-muted">
                  {t.caseStudy.timeline}
                </dt>
                <dd className="mt-1 text-primary/80">{study.timeline}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-wider text-muted">
                  {t.caseStudy.team}
                </dt>
                <dd className="mt-1 text-primary/80">{study.team}</dd>
              </div>
            </dl>
          </Reveal>

          {img && (
            <Reveal delay={0.1}>
              <div className="dt-card relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {study.heroMetrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="h-full">
              <MetricCard metric={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </header>
  );
}
