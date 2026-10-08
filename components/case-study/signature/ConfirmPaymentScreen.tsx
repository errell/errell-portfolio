import { Bolt, ChevronLeft, Fingerprint, Lock } from "./icons";

const TRACK_WIDTH = 246; // screen width (278) minus 2 × 16px padding

/** Payments: full-page confirmation with the amount spelled out in words. */
export function ConfirmPaymentScreen() {
  return (
    <div className="flex h-full flex-col bg-[#070B16] px-4 pb-8">
      {/* App bar */}
      <div className="relative flex h-10 items-center justify-between">
        <span className="-ml-1 flex items-center gap-0.5 text-[14px] font-medium text-[#00D4FF]">
          <ChevronLeft size={20} />
          Edit
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[15px] font-semibold text-white">
          Confirm payment
        </span>
        <Lock size={16} className="text-white/45" />
      </div>

      {/* Recipient */}
      <p className="mt-5 text-[12px] font-medium text-white/55">You are sending to</p>
      <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#111829] p-3.5 ring-1 ring-white/[0.08]">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8B7CF6] to-[#5B8DEF] font-sora text-[14px] font-semibold text-white">
          MS
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-white">Maria S. Santos</p>
          <p className="mt-0.5 text-[12.5px] tabular-nums text-white/55">
            <span className="tracking-[0.12em]">••••</span> 4821 · BDO
          </p>
        </div>
      </div>

      {/* Amount */}
      <p className="mt-6 text-[12px] font-medium text-white/55">Amount</p>
      <p className="mt-1 flex items-baseline gap-1.5 font-sora font-semibold tracking-[-0.02em] text-white">
        <span className="text-[26px] text-white/70">₱</span>
        <span className="text-[38px] leading-none tabular-nums">1,500.00</span>
      </p>
      <div className="mt-3 rounded-xl bg-[#00D4FF]/[0.08] px-3.5 py-2.5 ring-1 ring-[#00D4FF]/25">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#00D4FF]">
          In words
        </p>
        <p className="mt-0.5 text-[14px] font-medium leading-snug text-white">
          “One thousand five hundred pesos”
        </p>
      </div>

      {/* Rail */}
      <div className="mt-4 flex items-center gap-3 border-t border-white/[0.08] pt-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#34D399]/15 text-[#34D399]">
          <Bolt size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-white">Rail: chosen for you</p>
          <p className="text-[12px] text-white/55">Arrives instantly</p>
        </div>
        <span className="rounded-full bg-[#34D399]/15 px-2 py-0.5 text-[10.5px] font-semibold text-[#5EEAB0]">
          Instant
        </span>
      </div>

      <div className="flex-1" />

      {/* Hold to confirm */}
      <div
        className="relative h-14 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/10"
        style={{ width: TRACK_WIDTH }}
      >
        <HoldLabel tone="light" />
        <div
          className="absolute inset-y-0 left-0 w-[30%] overflow-hidden rounded-full bg-gradient-to-r from-[#00A9D6] to-[#00D4FF] motion-safe:animate-holdFill"
        >
          <div className="absolute inset-y-0 left-0" style={{ width: TRACK_WIDTH }}>
            <HoldLabel tone="dark" />
          </div>
        </div>
        <span className="absolute left-1.5 top-1.5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#04121A] shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          <Fingerprint size={22} strokeWidth={1.9} />
        </span>
      </div>
      <p className="mt-2.5 text-center text-[11px] text-white/45">Release to cancel</p>
    </div>
  );
}

function HoldLabel({ tone }: { tone: "light" | "dark" }) {
  return (
    <span
      className={`absolute inset-0 flex items-center justify-center pl-8 text-[15px] font-semibold ${
        tone === "light" ? "text-white/90" : "text-[#04121A]"
      }`}
    >
      Hold to confirm
    </span>
  );
}
