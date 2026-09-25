"use client";

import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { SectionDivider } from "@/components/case-study/SectionDivider";
import { FlowDiagram } from "@/components/case-study/FlowDiagram";
import { DataTable } from "@/components/case-study/DataTable";
import { FindingsList } from "@/components/case-study/FindingsList";
import { PersonaCard } from "@/components/case-study/PersonaCard";
import { JourneyMap } from "@/components/case-study/JourneyMap";
import { DecisionList } from "@/components/case-study/DecisionList";
import { WireframeBlock } from "@/components/case-study/WireframeBlock";
import { MetricsGrid } from "@/components/case-study/MetricsGrid";
import { KeyLearnings } from "@/components/case-study/KeyLearnings";
import { PullQuote } from "@/components/ui/PullQuote";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="mb-6 max-w-2xl text-base leading-relaxed text-primary/60">
        {children}
      </p>
    </Reveal>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h3 className="mb-4 font-sora text-lg font-semibold text-primary">
        {children}
      </h3>
    </Reveal>
  );
}

interface Props {
  study: CaseStudy;
  prev?: { slug: string; number: string };
  next?: { slug: string; number: string };
}

export function CaseStudyContent({ study, prev, next }: Props) {
  const { t } = useT();
  const { overview, research, define, design, outcomes } = study.sections;
  const cs = t.caseStudy;

  const localizedTitle = (slug: string) =>
    t.caseStudies[slug as keyof typeof t.caseStudies]?.title ?? slug;

  return (
    <article>
      <CaseStudyHeader study={study} />

      <div className="mx-auto max-w-canvas space-y-20 px-5 py-20 md:px-8 md:py-24">
        {/* 01 — Overview */}
        <section aria-labelledby="overview-heading">
          <SectionDivider number="01" title={cs.sections.overview} />
          <div className="mt-8 space-y-10" id="overview-heading">
            <Reveal>
              <PullQuote>{overview.problem}</PullQuote>
            </Reveal>

            <div>
              <SubHeading>{cs.sub.flow}</SubHeading>
              <Reveal delay={0.05}>
                <FlowDiagram
                  current={overview.currentState}
                  target={overview.targetState}
                />
              </Reveal>
            </div>

            <div>
              <SubHeading>{cs.sub.objectives}</SubHeading>
              <ul className="grid gap-3 sm:grid-cols-2">
                {overview.objectives.map((o, i) => (
                  <Reveal
                    as="li"
                    key={o}
                    delay={i * 0.05}
                    className="flex gap-3 rounded-xl border border-border bg-surface/40 p-4 text-sm text-primary/75"
                  >
                    <span aria-hidden className="text-accent">
                      ◆
                    </span>
                    <span>{o}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 02 — Discovery & Research */}
        <section aria-labelledby="research-heading">
          <SectionDivider
            number="02"
            title={cs.sections.research}
            description={research.intro}
          />
          <div className="mt-8 space-y-10" id="research-heading">
            <div>
              <SubHeading>{cs.sub.methods}</SubHeading>
              <Reveal delay={0.05}>
                <DataTable
                  headers={["Method", "What we did", "Sample"]}
                  rows={research.methods.map((m) => [
                    m.method,
                    m.detail,
                    m.sample,
                  ])}
                  caption={cs.sub.methods}
                />
              </Reveal>
            </div>

            <div>
              <SubHeading>{cs.sub.findings}</SubHeading>
              <FindingsList findings={research.findings} />
            </div>

            <div>
              <SubHeading>{cs.sub.personas}</SubHeading>
              <div className="grid gap-5 lg:grid-cols-3">
                {research.personas.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.08} className="h-full">
                    <PersonaCard persona={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Define */}
        <section aria-labelledby="define-heading">
          <SectionDivider number="03" title={cs.sections.define} />
          <div className="mt-8 space-y-10" id="define-heading">
            <div>
              <SubHeading>{cs.sub.hmw}</SubHeading>
              <ul className="space-y-3">
                {define.hmw.map((h, i) => (
                  <Reveal
                    as="li"
                    key={h}
                    delay={i * 0.05}
                    className="rounded-xl border-l-2 border-accent/60 bg-surface/40 px-5 py-3 text-sm font-medium text-primary/85"
                  >
                    {h}
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <SubHeading>{cs.sub.journey}</SubHeading>
              <Reveal delay={0.05}>
                <JourneyMap stages={define.journey} />
              </Reveal>
            </div>

            <div>
              <SubHeading>{cs.sub.affinity}</SubHeading>
              <ul className="grid gap-3 sm:grid-cols-2">
                {define.affinity.map((a, i) => (
                  <Reveal
                    as="li"
                    key={a}
                    delay={i * 0.05}
                    className="flex gap-3 rounded-xl border border-border bg-surface/40 p-4 text-sm text-primary/75"
                  >
                    <span aria-hidden className="text-accent">
                      ▹
                    </span>
                    <span>{a}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 04 — Design */}
        <section aria-labelledby="design-heading">
          <SectionDivider number="04" title={cs.sections.design} />
          <div className="mt-8 space-y-10" id="design-heading">
            <div>
              <SubHeading>{cs.sub.decisions}</SubHeading>
              <DecisionList decisions={design.decisions} />
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              <div>
                <SubHeading>{cs.sub.signature}</SubHeading>
                <Reveal delay={0.05}>
                  <WireframeBlock spec={design.wireframe} />
                </Reveal>
              </div>
              <div>
                <SubHeading>{cs.sub.iterations}</SubHeading>
                <Reveal delay={0.05}>
                  <DataTable
                    headers={["Round", "Focus", "Outcome"]}
                    rows={design.iterations.map((it) => [
                      it.round,
                      it.focus,
                      it.outcome,
                    ])}
                    caption={cs.sub.iterations}
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Outcomes */}
        <section aria-labelledby="outcomes-heading">
          <SectionDivider number="05" title={cs.sections.outcomes} />
          <div className="mt-8 space-y-10" id="outcomes-heading">
            <Lead>{outcomes.intro}</Lead>
            <MetricsGrid metrics={outcomes.metrics} />

            <div>
              <SubHeading>{cs.sub.learnings}</SubHeading>
              <KeyLearnings learnings={study.keyLearnings} />
            </div>
          </div>
        </section>

        {/* Prev / Next nav */}
        <nav
          aria-label="Case study navigation"
          className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40"
            >
              <span className="font-mono text-xs text-primary/40">
                ← {cs.prev} · {prev.number}
              </span>
              <p className="mt-2 font-sora font-semibold text-primary group-hover:text-accent">
                {localizedTitle(prev.slug)}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group rounded-2xl border border-border bg-surface/40 p-6 text-right transition-colors hover:border-accent/40"
            >
              <span className="font-mono text-xs text-primary/40">
                {cs.next} · {next.number} →
              </span>
              <p className="mt-2 font-sora font-semibold text-primary group-hover:text-accent">
                {localizedTitle(next.slug)}
              </p>
            </Link>
          ) : (
            <Link
              href="/work"
              className="group rounded-2xl border border-border bg-surface/40 p-6 text-right transition-colors hover:border-accent/40"
            >
              <span className="font-mono text-xs text-primary/40">
                {cs.allWork} →
              </span>
              <p className="mt-2 font-sora font-semibold text-primary group-hover:text-accent">
                {cs.backToAll}
              </p>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
