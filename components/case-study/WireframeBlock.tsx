import type { WireframeSpec } from "@/types/case-study";

// The wireframe stays on a near-black panel in both themes.
export function WireframeBlock({ spec }: { spec: WireframeSpec }) {
  return (
    <figure className="overflow-hidden rounded-[20px] border border-white/10 bg-[#111] text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-2 font-mono text-xs text-white/55">{spec.title}</span>
      </div>
      <pre
        className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/90"
        aria-label={`Wireframe: ${spec.title}`}
      >
        <code>{spec.rows.join("\n")}</code>
      </pre>
      <figcaption className="border-t border-white/10 px-5 py-3 text-xs leading-relaxed text-white/55">
        {spec.caption}
      </figcaption>
    </figure>
  );
}
