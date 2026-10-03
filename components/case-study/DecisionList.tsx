import type { DesignDecision } from "@/types/case-study";
import { Reveal } from "@/components/ui/Reveal";

export function DecisionList({ decisions }: { decisions: DesignDecision[] }) {
  return (
    <ol className="space-y-4">
      {decisions.map((d, i) => (
        <Reveal
          as="li"
          key={d.title}
          delay={i * 0.05}
          className="flex gap-4 rounded-2xl border border-border bg-surface/40 p-5"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 font-mono text-sm font-medium text-accent">
            {i + 1}
          </span>
          <div>
            <h3 className="font-sora text-base font-semibold text-primary">
              {d.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-primary/60">
              {d.detail}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
