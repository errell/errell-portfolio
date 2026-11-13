"use client";

import Image from "next/image";
import Link from "next/link";
import type { ShowcaseCaseStudy, ShowcasePoint } from "@/types/case-study";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { SectionDivider } from "@/components/case-study/SectionDivider";
import { PullQuote } from "@/components/ui/PullQuote";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { useT } from "@/lib/i18n";

interface Props {
  study: ShowcaseCaseStudy;
  prev?: { slug: string; number: string };
}

function PointList({
  heading,
  points,
  marker,
}: {
  heading: string;
  points: ShowcasePoint[];
  marker: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-border bg-surface/40 p-6 md:p-7">
      <h3 className="font-sora text-lg font-semibold text-primary">{heading}</h3>
      <ul className="mt-5 space-y-4">
        {points.map((p) => (
          <li key={p.title} className="flex gap-3">
            <span aria-hidden className="mt-0.5 text-accent">
              {marker}
            </span>
            <div>
              <p className="text-sm font-semibold text-primary/90">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-primary/60">
                {p.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ShowcaseContent({ study, prev }: Props) {
  const { t } = useT();
  const cs = t.caseStudy;
  const { video, delivery } = study;

  const localizedTitle = (slug: string) =>
    t.caseStudies[slug as keyof typeof t.caseStudies]?.title ?? slug;

  return (
    <article>
      <CaseStudyHeader study={study} />

      <div className="mx-auto max-w-canvas space-y-20 px-5 py-20 md:px-8 md:py-24">
        {/* 01 — Walkthrough video */}
        <section aria-labelledby="walkthrough-heading">
          <div id="walkthrough-heading">
            <SectionDivider
              number="01"
              title={video.title}
              description={video.description}
            />
          </div>
          <Reveal delay={0.05}>
            <figure className="mt-8">
              <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-xl">
                <video
                  className="block aspect-video h-auto w-full bg-black"
                  controls
                  playsInline
                  preload="metadata"
                  poster={video.poster}
                  width={video.width}
                  height={video.height}
                  aria-label={`${study.title}: ${video.title} (${video.duration})`}
                >
                  <source src={video.src} type={video.type} />
                  {video.captions ? (
                    <track
                      kind="captions"
                      src={video.captions.src}
                      srcLang={video.captions.srcLang}
                      label={video.captions.label}
                      default
                    />
                  ) : null}
                  Your browser can’t play this video.{" "}
                  <a href={video.src} className="text-accent underline">
                    Download the walkthrough
                  </a>
                  .
                </video>
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-primary/50">
                <span>{video.duration}</span>
                <span aria-hidden>·</span>
                <span>{study.disclaimer}</span>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* 02 — Challenge, opportunity, solution */}
        <section aria-labelledby="context-heading">
          <div id="context-heading">
            <SectionDivider
              number="02"
              title="The Challenge, the Opportunity, the Solution"
            />
          </div>
          <div className="mt-8 space-y-6">
            <Reveal>
              <PullQuote>{study.opportunity.headline}</PullQuote>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-3">
              <Reveal className="h-full">
                <PointList
                  heading="The Challenge"
                  points={study.challenge}
                  marker="✕"
                />
              </Reveal>
              <Reveal delay={0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-7">
                  <h3 className="font-sora text-lg font-semibold text-primary">
                    The Opportunity
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-primary/75">
                    {study.opportunity.detail}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="h-full">
                <PointList
                  heading="The Solution"
                  points={study.solution}
                  marker="◆"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 03 — Key features overview */}
        <section aria-labelledby="features-heading">
          <div id="features-heading">
            <SectionDivider
              number="03"
              title="Key features"
              description="Seven screens from sign-in to the bench lead view."
            />
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.features.map((f, i) => (
              <Reveal
                as="li"
                key={f.id}
                delay={(i % 4) * 0.05}
                className="h-full"
              >
                <a
                  href={`#feature-${f.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="font-mono text-sm font-medium text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 font-sora text-base font-semibold text-primary group-hover:text-accent">
                    {f.title}
                  </span>
                  <span className="mt-1.5 text-sm leading-relaxed text-primary/60">
                    {f.summary}
                  </span>
                </a>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* 04 — Feature walkthrough */}
        <section aria-labelledby="screens-heading">
          <div id="screens-heading">
            <SectionDivider
              number="04"
              title="Feature by feature"
              description={study.disclaimer}
            />
          </div>
          <div className="mt-10 space-y-16 md:space-y-20">
            {study.features.map((f, i) => (
              <div
                key={f.id}
                id={`feature-${f.id}`}
                className="scroll-mt-24"
              >
                <Reveal>
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag variant="accent">
                      Feature {String(i + 1).padStart(2, "0")}
                    </Tag>
                  </div>
                  <h3 className="mt-3 font-sora text-xl font-semibold text-primary md:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-primary/60">
                    {f.lead}
                  </p>
                </Reveal>

                <div
                  className={
                    f.screens.length > 1
                      ? "mt-6 grid gap-4 lg:grid-cols-2"
                      : "mt-6"
                  }
                >
                  {f.screens.map((s) => (
                    <Reveal key={s.src} delay={0.05}>
                      <figure className="overflow-hidden rounded-2xl border border-border bg-surface/40 shadow-lg">
                        <Image
                          src={s.src}
                          alt={s.alt}
                          width={s.width}
                          height={s.height}
                          sizes={
                            f.screens.length > 1
                              ? "(max-width: 1024px) 100vw, 600px"
                              : "(max-width: 1240px) 100vw, 1200px"
                          }
                          className="h-auto w-full"
                        />
                      </figure>
                    </Reveal>
                  ))}
                </div>

                <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {f.callouts.map((c, ci) => (
                    <Reveal
                      as="li"
                      key={c.title}
                      delay={ci * 0.05}
                      className="flex gap-3 rounded-xl border border-border bg-surface/40 p-4"
                    >
                      <span
                        aria-hidden
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-semibold text-accent"
                      >
                        {ci + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-primary/90">
                          {c.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-primary/60">
                          {c.detail}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* 05 — Delivery & next steps */}
        <section aria-labelledby="delivery-heading">
          <div id="delivery-heading">
            <SectionDivider
              number="05"
              title="Delivery & next steps"
              description={delivery.intro}
            />
          </div>
          <div className="mt-8 space-y-10">
            <Reveal>
              <ol
                aria-label="Process"
                className="flex flex-wrap items-center gap-2 font-mono text-xs text-primary/70"
              >
                {delivery.process.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-border bg-surface/60 px-3 py-1.5">
                      {step}
                    </span>
                    {i < delivery.process.length - 1 ? (
                      <span aria-hidden className="text-accent">
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </Reveal>

            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {delivery.milestones.map((m, i) => (
                <Reveal
                  as="li"
                  key={m.title}
                  delay={i * 0.05}
                  className="h-full rounded-2xl border border-border bg-surface/40 p-5"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {m.dates}
                  </p>
                  <h3 className="mt-2 font-sora text-base font-semibold text-primary">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-primary/60">
                    {m.detail}
                  </p>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <p className="rounded-xl border-l-2 border-accent/60 bg-surface/40 px-5 py-3 text-sm font-medium text-primary/85">
                {delivery.next}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Prev / All work nav */}
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
        </nav>
      </div>
    </article>
  );
}
