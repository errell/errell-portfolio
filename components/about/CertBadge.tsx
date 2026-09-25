import type { Certification } from "@/data/certifications";

export function CertBadge({ cert }: { cert: Certification }) {
  return (
    <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-surface/40 p-5">
      <span
        aria-hidden
        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 15a5 5 0 100-10 5 5 0 000 10z" />
          <path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5" />
        </svg>
      </span>
      <div>
        <h3 className="text-sm font-semibold leading-snug text-primary">
          {cert.name}
        </h3>
        <p className="mt-1 font-mono text-xs text-primary/45">{cert.issuer}</p>
      </div>
    </div>
  );
}
