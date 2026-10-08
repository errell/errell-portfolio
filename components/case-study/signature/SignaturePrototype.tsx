import type { ComponentType } from "react";
import type { SignatureScreen, WireframeSpec } from "@/types/case-study";
import { PhoneMockup } from "./PhoneMockup";
import { CameraCoachScreen } from "./CameraCoachScreen";
import { ConfirmPaymentScreen } from "./ConfirmPaymentScreen";
import { GoalFirstScreen } from "./GoalFirstScreen";

const screens: Record<SignatureScreen, { Screen: ComponentType; describe: string }> = {
  "camera-coach": {
    Screen: CameraCoachScreen,
    describe:
      "Step 2 of 5. Heading: Kunan ng litrato ang iyong ID. A live camera viewfinder shows an ID card aligned inside a cyan capture frame, with checks for Good lighting and All edges visible, an Auto-captures when ready indicator, and a Kunan ang litrato button.",
  },
  "confirm-payment": {
    Screen: ConfirmPaymentScreen,
    describe:
      "Confirm payment screen with an Edit link. You are sending to Maria S. Santos, account ending 4821 at BDO. Amount ₱1,500.00, spelled out as One thousand five hundred pesos. Rail chosen for you, arrives instantly. A Hold to confirm button at the bottom.",
  },
  "goal-first": {
    Screen: GoalFirstScreen,
    describe:
      "Bilingual question: What are you saving for? Four goal tiles: House down payment (selected), Emergency fund, Travel and Retirement. A note says You can withdraw anytime, above an Ipagpatuloy / Continue button.",
  },
};

/** Signature interaction rendered as a coded, high-fidelity phone prototype. */
export function SignaturePrototype({
  spec,
  screen,
}: {
  spec: WireframeSpec;
  screen: SignatureScreen;
}) {
  const { Screen, describe } = screens[screen];
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface/60">
      {/* Soft accent glow behind the device */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative flex items-center gap-2 border-b border-border px-4 py-3">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-xs text-primary/60">{spec.title}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-primary/40">
          Prototype
        </span>
      </div>
      <div className="relative flex justify-center px-3 py-8 sm:px-6 sm:py-10">
        <PhoneMockup label={`Prototype screen, ${spec.title}. ${describe}`}>
          <Screen />
        </PhoneMockup>
      </div>
      <figcaption className="relative border-t border-border px-5 py-3 text-xs leading-relaxed text-primary/60">
        {spec.caption}
      </figcaption>
    </figure>
  );
}
