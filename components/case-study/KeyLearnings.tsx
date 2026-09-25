import { Reveal } from "@/components/ui/Reveal";

export function KeyLearnings({ learnings }: { learnings: string[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {learnings.map((l, i) => (
        <Reveal
          as="li"
          key={i}
          delay={(i % 2) * 0.08}
          className="rounded-2xl border border-border bg-surface/40 p-6"
        >
          <span className="font-mono text-2xl font-bold text-accent/40">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-primary/80">{l}</p>
        </Reveal>
      ))}
    </ol>
  );
}
