import { Camera, Check, ChevronLeft, IdCard } from "./icons";

const CYAN = "#00D4FF";

/** Onboarding step 2: live ID capture with on-frame coaching. */
export function CameraCoachScreen() {
  return (
    <div className="flex h-full flex-col bg-[#070B16] px-4 pb-8">
      {/* App bar */}
      <div className="flex h-10 items-center justify-between">
        <span className="-ml-1 flex items-center gap-0.5 text-[14px] font-medium text-white/90">
          <ChevronLeft size={20} />
          Back
        </span>
        <span className="text-[12px] font-medium text-white/55">Step 2 of 5</span>
      </div>

      {/* Progress */}
      <div aria-hidden className="mt-1.5 flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-[3px] flex-1 rounded-full ${i < 2 ? "bg-[#00D4FF]" : "bg-white/[0.12]"}`}
          />
        ))}
      </div>

      {/* Heading */}
      <p className="mt-4 font-sora text-[19px] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
        Kunan ng litrato ang iyong ID
      </p>
      <p className="mt-1 text-[12px] leading-snug text-white/55">
        Take a photo of the front of your valid ID
      </p>

      {/* Viewfinder */}
      <div
        className="relative mt-3.5 flex-1 overflow-hidden rounded-[24px] ring-1 ring-white/10"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, #2b3346 0%, #171c29 45%, #0b0e16 100%)",
        }}
      >
        {/* Soft out-of-focus background shapes (a desk, a lamp glow) */}
        <div
          aria-hidden
          className="absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-60 blur-2xl"
          style={{ background: "radial-gradient(circle, #5b6b8c 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -left-10 h-44 w-56 rounded-full opacity-50 blur-2xl"
          style={{ background: "radial-gradient(circle, #3a2f2a 0%, transparent 70%)" }}
        />

        {/* Instruction pill */}
        <div className="absolute inset-x-0 top-3 z-10 flex justify-center">
          <span className="flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-medium text-white/90 ring-1 ring-white/10 backdrop-blur">
            <IdCard size={14} className="text-[#00D4FF]" />
            Align ID within the frame
          </span>
        </div>

        {/* Capture frame + simulated ID card */}
        <div className="absolute left-1/2 top-[44%] h-[124px] w-[196px] -translate-x-1/2 -translate-y-1/2">
          <SampleIdCard />

          {/* Dim outside the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[400px] rounded-[410px]"
            style={{ boxShadow: "inset 0 0 0 400px rgba(4,6,12,0.35)" }}
          />

          {/* Cyan "will pass" frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-[16px] motion-safe:animate-framePulse"
            style={{ boxShadow: `0 0 0 1px ${CYAN}55, 0 0 24px ${CYAN}33` }}
          />
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <Corner key={c} pos={c} />
          ))}

          {/* Scan line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 motion-safe:animate-scanLine"
            style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, boxShadow: `0 0 10px ${CYAN}` }}
          />
        </div>

        {/* Live checks */}
        <div className="absolute inset-x-0 bottom-3 z-10 flex flex-col items-center gap-1.5">
          <CheckChip label="Good lighting" />
          <CheckChip label="All edges visible" />
        </div>
      </div>

      {/* Auto-capture status */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-white/70">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D4FF]" />
        </span>
        Auto-captures when ready
      </div>

      {/* Primary action */}
      <div className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-[#00D4FF] text-[15px] font-semibold text-[#04121A] shadow-[0_8px_24px_-8px_rgba(0,212,255,0.6)]">
        <Camera size={19} strokeWidth={2} />
        Kunan ang litrato
      </div>
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute h-6 w-6 border-[#00D4FF]";
  const map = {
    tl: "-left-2 -top-2 rounded-tl-[14px] border-l-[3px] border-t-[3px]",
    tr: "-right-2 -top-2 rounded-tr-[14px] border-r-[3px] border-t-[3px]",
    bl: "-bottom-2 -left-2 rounded-bl-[14px] border-b-[3px] border-l-[3px]",
    br: "-bottom-2 -right-2 rounded-br-[14px] border-b-[3px] border-r-[3px]",
  } as const;
  return (
    <span
      aria-hidden
      className={`${base} ${map[pos]}`}
      style={{ filter: `drop-shadow(0 0 6px ${CYAN}aa)` }}
    />
  );
}

function CheckChip({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-[#06231c]/85 py-1 pl-1 pr-3 text-[11.5px] font-medium text-[#7CF5C8] ring-1 ring-[#34D399]/30 backdrop-blur">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#34D399] text-[#052018]">
        <Check size={12} strokeWidth={3} />
      </span>
      {label}
    </span>
  );
}

/** Generic, fictional ID silhouette: shapes only, no real names or numbers. */
function SampleIdCard() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden rounded-[10px] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.7)]"
      style={{
        transform: "rotate(-1.2deg)",
        background: "linear-gradient(135deg, #eef2f6 0%, #dde5ee 55%, #cfd9e4 100%)",
      }}
    >
      {/* Header band */}
      <div className="flex h-[26px] items-center gap-2 px-2.5" style={{ background: "linear-gradient(90deg, #2c5a7a, #3f7f8f)" }}>
        <span className="h-3.5 w-3.5 rounded-full border border-white/70 bg-white/20" />
        <span className="flex flex-col gap-[3px]">
          <span className="h-[3px] w-20 rounded-full bg-white/85" />
          <span className="h-[3px] w-12 rounded-full bg-white/55" />
        </span>
      </div>
      <div className="flex gap-2.5 p-2.5">
        {/* Photo placeholder: abstract silhouette */}
        <div className="relative h-[66px] w-[52px] shrink-0 overflow-hidden rounded-[5px] bg-gradient-to-b from-[#b9c6d4] to-[#9fb0c2]">
          <span className="absolute left-1/2 top-[14px] h-[22px] w-[22px] -translate-x-1/2 rounded-full bg-[#7d90a6]" />
          <span className="absolute -bottom-3 left-1/2 h-[34px] w-[46px] -translate-x-1/2 rounded-t-full bg-[#7d90a6]" />
        </div>
        <div className="flex flex-1 flex-col gap-[7px] pt-1">
          <span className="h-[3px] w-10 rounded-full bg-[#8a9bb0]" />
          <span className="h-[6px] w-[92%] rounded-full bg-[#2f3e52]" />
          <span className="h-[3px] w-12 rounded-full bg-[#8a9bb0]" />
          <span className="h-[5px] w-[70%] rounded-full bg-[#46566b]" />
          <span className="h-[3px] w-9 rounded-full bg-[#8a9bb0]" />
          <span className="h-[5px] w-[55%] rounded-full bg-[#46566b]" />
        </div>
      </div>
      {/* Signature-like stroke */}
      <svg className="absolute bottom-2 right-3" width="44" height="14" viewBox="0 0 44 14" fill="none">
        <path d="M1 10c4-6 6-7 7-3s3 4 6-1 5-4 6 0 4 3 8-2 6-3 7 0 4 3 8 1" stroke="#41546b" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {/* Soft glare */}
      <span className="absolute -right-6 -top-8 h-20 w-24 rotate-12 rounded-full bg-white/25 blur-xl" />
    </div>
  );
}
