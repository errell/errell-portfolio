import type { WireframeSpec } from "@/types/case-study";

// The wireframe stays on the dark canvas in both themes.
export function WireframeBlock({ spec }: { spec: WireframeSpec }) {
  return (
    <figure className="overflow-hidden rounded border border-railBorder bg-rail">
      <div className="flex items-center gap-2 border-b border-railBorder px-4 py-3">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-railMuted/40" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-railMuted/25" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-railMuted/15" />
        <span className="ml-2 font-mono text-xs text-railMuted">{spec.title}</span>
      </div>
      <pre
        className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-railText"
        aria-label={`Wireframe: ${spec.title}`}
      >
        <code>{spec.rows.join("\n")}</code>
      </pre>
      <figcaption className="border-t border-railBorder px-5 py-3 text-xs leading-relaxed text-railMuted">
        {spec.caption}
      </figcaption>
    </figure>
  );
}
