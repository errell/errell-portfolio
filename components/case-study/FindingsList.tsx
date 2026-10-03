import type { Finding } from "@/types/case-study";
import { Reveal } from "@/components/ui/Reveal";

export function FindingsList({ findings }: { findings: Finding[] }) {
  return (
    <ol className="space-y-4">
      {findings.map((f, i) => (
        <Reveal
          as="li"
          key={f.title}
          delay={i * 0.06}
          className="flex gap-4 rounded-2xl border border-border bg-surface/40 p-5"
        >
          <span className="font-mono text-sm font-medium text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-sora text-base font-semibold text-primary">
              {f.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-primary/60">
              {f.detail}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
