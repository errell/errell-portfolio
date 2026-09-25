import type { Persona } from "@/types/case-study";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6">
      <div className="flex items-center gap-4">
        <div
          aria-hidden
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent/15 font-sora text-lg font-semibold text-accent"
        >
          {initials(persona.name)}
        </div>
        <div>
          <h3 className="font-sora text-lg font-semibold text-primary">
            {persona.name}
          </h3>
          <p className="text-sm text-primary/60">{persona.role}</p>
          <p className="font-mono text-xs text-primary/40">
            {persona.location}
          </p>
        </div>
      </div>

      <blockquote className="mt-5 border-l-2 border-accent/50 pl-4 text-sm italic leading-relaxed text-primary/80">
        &ldquo;{persona.quote}&rdquo;
      </blockquote>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/40">
            Goals
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-primary/70">
            {persona.goals.map((g) => (
              <li key={g} className="flex gap-2">
                <span aria-hidden className="text-accent">
                  +
                </span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/40">
            Frustrations
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-primary/70">
            {persona.frustrations.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden className="text-amber">
                  −
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
