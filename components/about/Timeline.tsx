import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";

export function Timeline() {
  return (
    <ol className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
      {experience.map((e, i) => (
        <Reveal
          as="li"
          key={e.period + e.role}
          delay={i * 0.08}
          className="relative pl-10"
        >
          <span
            aria-hidden
            className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full border border-accent/60 bg-canvas"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>

          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            {e.period}
          </p>
          <h3 className="mt-2 font-sora text-lg font-semibold text-primary">
            {e.role}
          </h3>
          <p className="text-sm text-primary/70">{e.org}</p>
          {e.context && (
            <p className="mt-0.5 font-mono text-xs text-primary/40">
              {e.context}
            </p>
          )}
          <ul className="mt-3 space-y-1.5">
            {e.points.map((p) => (
              <li
                key={p}
                className="flex gap-2 text-sm leading-relaxed text-primary/65"
              >
                <span aria-hidden className="text-accent/60">
                  ·
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}
