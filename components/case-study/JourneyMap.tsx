import type { JourneyStage } from "@/types/case-study";
import { cn } from "@/lib/utils";

const emotionStyles: Record<
  JourneyStage["emotion"],
  { dot: string; label: string; face: string }
> = {
  positive: { dot: "bg-green-400", label: "text-green-400", face: "◕" },
  neutral: { dot: "bg-primary/40", label: "text-primary/50", face: "◐" },
  negative: { dot: "bg-amber", label: "text-amber", face: "◔" },
};

export function JourneyMap({ stages }: { stages: JourneyStage[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface/40 p-4 md:p-6">
      <div
        className="grid min-w-[640px] gap-3"
        style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
      >
        {stages.map((s, i) => {
          const style = emotionStyles[s.emotion];
          return (
            <div key={s.stage} className="relative flex flex-col">
              {/* connector line */}
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-[-6px] top-[10px] hidden h-px w-3 bg-border md:block"
                />
              )}
              <div className="flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", style.dot)} />
                <span className="font-mono text-xs uppercase tracking-wide text-primary/50">
                  {s.stage}
                </span>
              </div>
              <div className="mt-3 flex-1 rounded-xl border border-border bg-canvas/40 p-4">
                <p className="text-sm font-medium text-primary">{s.action}</p>
                <p className="mt-3 flex items-start gap-2 text-xs italic leading-relaxed text-primary/60">
                  <span aria-hidden className={cn("text-base leading-none", style.label)}>
                    {style.face}
                  </span>
                  <span>&ldquo;{s.thought}&rdquo;</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
