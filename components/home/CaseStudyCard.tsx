"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";
import { Tag } from "@/components/ui/Tag";
import { useT } from "@/lib/i18n";
import { caseImages } from "@/data/media";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Expanded variant used on the /work index. */
  expanded?: boolean;
}

export function CaseStudyCard({ study, expanded = false }: CaseStudyCardProps) {
  const { t } = useT();
  const slug = study.slug as keyof typeof t.caseStudies;
  const localized = t.caseStudies[slug] ?? {
    title: study.title,
    subtitle: study.subtitle,
  };
  const img = caseImages[study.slug];

  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface"
    >
      {/* Thumbnail */}
      <div className="img-overlay relative aspect-[16/9] w-full overflow-hidden">
        {img && (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 z-10 rounded-md bg-canvas/70 px-2 py-1 font-mono text-xs text-accent backdrop-blur-sm">
          {study.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex flex-wrap justify-end gap-2">
          <Tag variant="outline">{study.industry}</Tag>
        </div>

        <h3 className="mt-3 font-sora text-xl font-semibold leading-snug text-primary group-hover:text-accent md:text-2xl">
          {localized.title}
        </h3>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-primary/60",
            !expanded && "line-clamp-3",
          )}
        >
          {localized.subtitle}
        </p>

        {expanded && (
          <p className="mt-4 font-mono text-xs text-primary/40">
            {study.timeline} · {study.team}
          </p>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
          {(expanded ? study.heroMetrics.slice(0, 4) : study.previewMetrics).map(
            (m) => (
              <div key={m.label}>
                <dd className="font-mono text-2xl font-bold text-amber md:text-3xl">
                  {m.direction === "down" && <span aria-hidden className="mr-0.5">↓</span>}
                  {m.direction === "up" && <span aria-hidden className="mr-0.5">↑</span>}
                  {m.value}
                </dd>
                <dt className="mt-1 text-xs leading-snug text-primary/50">
                  {m.label}
                </dt>
              </div>
            ),
          )}
        </dl>

        <div className="mt-6 flex items-center gap-1 text-sm font-medium text-accent">
          {t.work.readCase}
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
