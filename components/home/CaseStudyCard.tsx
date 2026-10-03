"use client";

import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { useT } from "@/lib/i18n";
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

  return (
    <Link
      href={`/work/${study.slug}`}
      className="dt-card group flex h-full flex-col p-6 md:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {study.number}
        </span>
        <span className="rounded-sm border border-border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {study.industry}
        </span>
      </div>

      <h3 className="mt-4 font-sans text-xl font-medium leading-snug tracking-[-0.03em] text-primary md:text-2xl">
        {localized.title}
      </h3>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed text-muted",
          !expanded && "line-clamp-2",
        )}
      >
        {localized.subtitle}
      </p>

      {expanded && (
        <p className="mt-4 font-mono text-xs text-muted">
          {study.timeline} · {study.team}
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
        {(expanded ? study.heroMetrics.slice(0, 4) : study.previewMetrics).map(
          (m) => (
            <div key={m.label}>
              <dd className="font-sans text-2xl font-medium tracking-[-0.03em] text-primary">
                {m.value}
              </dd>
              <dt className="mt-1 inline-flex items-start font-mono text-[11px] leading-snug text-muted">
                <span>{m.label}</span>
                {m.tooltip ? (
                  <InfoTooltip text={m.tooltip} label={`What is ${m.label}?`} />
                ) : null}
              </dt>
            </div>
          ),
        )}
      </dl>

      <div className="mt-6 text-sm font-medium text-link">
        {t.work.readCase}
        <span
          aria-hidden
          className="ml-1 inline-block transition-transform duration-150 group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
    </Link>
  );
}
