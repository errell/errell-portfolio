import type { ReactNode } from "react";

/**
 * A generic, unbranded modern phone frame: metal rail, thin black bezel,
 * rounded screen, camera pill, status bar and home indicator. The screen
 * content is purely illustrative, so the whole device is exposed to assistive
 * tech as a single image with a descriptive label.
 */
export function PhoneMockup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative mx-auto w-[296px] shrink-0 select-none max-[359px]:[zoom:0.86]"
    >
      {/* Side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-[104px] h-7 w-[3px] rounded-l-sm bg-[#2a2d35]" />
      <span aria-hidden className="absolute -left-[3px] top-[150px] h-12 w-[3px] rounded-l-sm bg-[#2a2d35]" />
      <span aria-hidden className="absolute -left-[3px] top-[208px] h-12 w-[3px] rounded-l-sm bg-[#2a2d35]" />
      <span aria-hidden className="absolute -right-[3px] top-[170px] h-20 w-[3px] rounded-r-sm bg-[#2a2d35]" />

      {/* Rail + bezel */}
      <div className="rounded-[50px] bg-gradient-to-b from-[#3a3e48] via-[#24272e] to-[#3a3e48] p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55),0_18px_36px_-18px_rgba(0,0,0,0.5)]">
        <div className="rounded-[47px] bg-[#050507] p-[9px]">
          <div className="relative h-[600px] overflow-hidden rounded-[38px] bg-[#070B16] font-inter text-white antialiased">
            {/* Camera pill */}
            <div aria-hidden className="absolute left-1/2 top-[10px] z-30 flex h-[25px] w-[80px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2.5">
              <span className="h-[9px] w-[9px] rounded-full bg-[#11151f] ring-1 ring-[#1d2433]" />
            </div>
            <StatusBar />
            <div className="absolute inset-0 flex flex-col pt-[46px]">{children}</div>
            {/* Home indicator */}
            <div aria-hidden className="absolute bottom-[7px] left-1/2 z-30 h-[4px] w-[104px] -translate-x-1/2 rounded-full bg-white/85" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 z-20 flex h-[46px] items-center justify-between px-[22px] pt-1 text-white"
    >
      <span className="text-[13px] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-[5px]">
        {/* Signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.8" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.8" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.8" />
        </svg>
        {/* Wi-Fi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.2c2.1 0 4 .8 5.5 2.1l1.2-1.3A9.7 9.7 0 0 0 7.5.4 9.7 9.7 0 0 0 .8 3l1.2 1.3a8 8 0 0 1 5.5-2.1Z" />
          <path d="M7.5 5.5c1.2 0 2.3.4 3.2 1.2l1.2-1.3a6.4 6.4 0 0 0-8.8 0l1.2 1.3c.9-.8 2-1.2 3.2-1.2Z" />
          <path d="M7.5 8.4c.4 0 .8.2 1.1.4L7.5 10 6.4 8.8c.3-.2.7-.4 1.1-.4Z" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.2" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="15" height="8" rx="1.8" fill="currentColor" />
          <path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" fill="currentColor" fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  );
}
