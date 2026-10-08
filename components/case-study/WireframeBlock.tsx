import type { WireframeSpec } from "@/types/case-study";
import { SignaturePrototype } from "@/components/case-study/signature/SignaturePrototype";

// The wireframe renders as a "terminal" that stays dark in both themes (a code
// surface reads best dark), so its inner text uses fixed light colors rather
// than theme tokens.
// When the spec names a coded prototype screen, that phone mockup is shown
// instead; the ASCII rows remain as the fallback.
export function WireframeBlock({ spec }: { spec: WireframeSpec }) {
  if (spec.screen) return <SignaturePrototype spec={spec} screen={spec.screen} />;
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-[#0d0d16]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#00D4FF]/60" />
        <span className="ml-2 font-mono text-xs text-white/50">{spec.title}</span>
      </div>
      <pre
        className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-[#7fe7ff]"
        aria-label={`Wireframe: ${spec.title}`}
      >
        <code>{spec.rows.join("\n")}</code>
      </pre>
      <figcaption className="border-t border-white/10 px-5 py-3 text-xs leading-relaxed text-white/50">
        {spec.caption}
      </figcaption>
    </figure>
  );
}
