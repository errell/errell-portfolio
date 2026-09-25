import type { FlowState } from "@/types/case-study";

function StateColumn({
  state,
  tone,
}: {
  state: FlowState;
  tone: "current" | "target";
}) {
  const isTarget = tone === "target";
  return (
    <div
      className={
        "flex-1 rounded-2xl border p-6 " +
        (isTarget
          ? "border-accent/40 bg-accent/[0.04]"
          : "border-border bg-surface/40")
      }
    >
      <div className="flex items-center gap-2">
        <span
          className={
            "h-2 w-2 rounded-full " + (isTarget ? "bg-accent" : "bg-amber")
          }
          aria-hidden
        />
        <h3
          className={
            "font-mono text-xs uppercase tracking-wider " +
            (isTarget ? "text-accent" : "text-amber")
          }
        >
          {state.title}
        </h3>
      </div>
      <ol className="mt-4 space-y-2.5">
        {state.points.map((p, i) => (
          <li key={p} className="flex gap-3 text-sm text-primary/75">
            <span className="font-mono text-xs text-primary/35">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FlowDiagram({
  current,
  target,
}: {
  current: FlowState;
  target: FlowState;
}) {
  return (
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
      <StateColumn state={current} tone="current" />
      <div
        aria-hidden
        className="grid shrink-0 place-items-center text-2xl text-accent md:rotate-0"
      >
        <span className="md:hidden">↓</span>
        <span className="hidden md:inline">→</span>
      </div>
      <StateColumn state={target} tone="target" />
    </div>
  );
}
