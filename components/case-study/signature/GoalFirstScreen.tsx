import type { ComponentType } from "react";
import { Check, ChevronLeft, Home, Lifebuoy, PalmTree, Plane, Shield } from "./icons";

interface Goal {
  label: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  tint: string; // icon tile background
  ink: string; // icon color
  selected?: boolean;
}

const goals: Goal[] = [
  { label: "House down payment", Icon: Home, tint: "bg-[#00D4FF]/15", ink: "text-[#00D4FF]", selected: true },
  { label: "Emergency fund", Icon: Lifebuoy, tint: "bg-[#F87171]/15", ink: "text-[#FCA5A5]" },
  { label: "Travel", Icon: Plane, tint: "bg-[#A78BFA]/15", ink: "text-[#C4B5FD]" },
  { label: "Retirement", Icon: PalmTree, tint: "bg-[#FBBF24]/15", ink: "text-[#FCD34D]" },
];

/** Investments: the first screen asks about a life goal, not a product. */
export function GoalFirstScreen() {
  return (
    <div className="flex h-full flex-col bg-[#070B16] px-4 pb-8">
      {/* App bar */}
      <div className="flex h-10 items-center">
        <ChevronLeft size={22} className="-ml-1 text-white/90" />
      </div>

      {/* Bilingual question */}
      <p className="mt-3 font-sora text-[22px] font-semibold leading-[1.18] tracking-[-0.015em] text-white">
        Ano ang pinapon mo?
      </p>
      <p className="mt-1 text-[14px] text-white/60">What are you saving for?</p>

      {/* Goal tiles */}
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {goals.map(({ label, Icon, tint, ink, selected }) => (
          <div
            key={label}
            className={`relative flex h-[116px] flex-col justify-between rounded-2xl p-3 ${
              selected
                ? "bg-[#00D4FF]/[0.09] ring-2 ring-[#00D4FF]"
                : "bg-[#111829] ring-1 ring-white/[0.08]"
            }`}
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint} ${ink}`}>
              <Icon size={19} />
            </span>
            {selected ? (
              <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#00D4FF] text-[#04121A]">
                <Check size={12} strokeWidth={3} />
              </span>
            ) : (
              <span className="absolute right-2.5 top-2.5 h-5 w-5 rounded-full ring-1 ring-white/20" />
            )}
            <span className="pr-1 text-[13.5px] font-semibold leading-[1.25] text-white">{label}</span>
          </div>
        ))}
      </div>

      {/* Reassurance */}
      <div className="mt-5 flex items-center gap-2.5 border-t border-white/[0.08] pt-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#34D399]/15 text-[#34D399]">
          <Shield size={16} />
        </span>
        <p className="text-[13px] font-medium text-white/85">You can withdraw anytime</p>
      </div>

      <div className="flex-1" />

      <div className="flex h-12 items-center justify-center rounded-full bg-[#00D4FF] text-[15px] font-semibold text-[#04121A] shadow-[0_8px_24px_-8px_rgba(0,212,255,0.6)]">
        Ipagpatuloy / Continue
      </div>
    </div>
  );
}
