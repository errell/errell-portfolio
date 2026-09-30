"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface InfoTooltipProps {
  /** Plain-language explanation shown in the tooltip */
  text: string;
  /** Accessible name for the trigger, e.g. "What is CSAT?" */
  label: string;
  className?: string;
}

type Coords = { top: number; left: number; placement: "above" | "below" };

const GAP = 8;
const MAX_WIDTH = 240;
const VIEWPORT_PAD = 8;
/** Above sticky nav (z-50) and glass layers */
const Z_INDEX = 9999;

function computePosition(trigger: DOMRect, tip: DOMRect): Coords {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const spaceBelow = vh - trigger.bottom - GAP;
  const spaceAbove = trigger.top - GAP;
  const placeBelow =
    spaceBelow >= tip.height || spaceBelow >= spaceAbove;

  let top = placeBelow
    ? trigger.bottom + GAP
    : trigger.top - tip.height - GAP;

  // Horizontal: center on trigger, then clamp into viewport
  let left = trigger.left + trigger.width / 2 - tip.width / 2;
  left = Math.max(
    VIEWPORT_PAD,
    Math.min(left, vw - tip.width - VIEWPORT_PAD),
  );

  // Vertical clamp as a last resort (very short viewports)
  top = Math.max(
    VIEWPORT_PAD,
    Math.min(top, vh - tip.height - VIEWPORT_PAD),
  );

  return {
    top,
    left,
    placement: placeBelow ? "below" : "above",
  };
}

function isFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export function InfoTooltip({ text, label, className }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [mounted, setMounted] = useState(false);
  const tipId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  /** Ignore the synthetic mouse-leave that follows a touch tap */
  const touchOpenedRef = useRef(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearLeaveTimer();
    setOpen(false);
    setCoords(null);
    touchOpenedRef.current = false;
  }, [clearLeaveTimer]);

  const openTip = useCallback(() => {
    clearLeaveTimer();
    setOpen(true);
  }, [clearLeaveTimer]);

  useEffect(() => {
    setMounted(true);
    return () => clearLeaveTimer();
  }, [clearLeaveTimer]);

  const updatePosition = useCallback(() => {
    const btn = btnRef.current;
    const tip = tipRef.current;
    if (!btn || !tip) return;
    setCoords(
      computePosition(btn.getBoundingClientRect(), tip.getBoundingClientRect()),
    );
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, text, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const onDoc = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (wrapRef.current?.contains(target)) return;
      if (tipRef.current?.contains(target)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        btnRef.current?.focus();
      }
    };
    const onReposition = () => updatePosition();

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc, { passive: true });
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);

    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open, close, updatePosition]);

  const onBtnKey = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      close();
    }
  };

  const scheduleClose = () => {
    if (!isFinePointer() || touchOpenedRef.current) return;
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      if (
        tipRef.current?.matches(":hover") ||
        wrapRef.current?.matches(":hover")
      ) {
        return;
      }
      if (!touchOpenedRef.current) close();
    }, 80);
  };

  const tooltip =
    open && mounted
      ? createPortal(
          <span
            ref={tipRef}
            id={tipId}
            role="tooltip"
            style={{
              position: "fixed",
              top: coords?.top ?? -9999,
              left: coords?.left ?? -9999,
              zIndex: Z_INDEX,
              maxWidth: MAX_WIDTH,
              visibility: coords ? "visible" : "hidden",
            }}
            className="pointer-events-auto w-max rounded-lg border border-border bg-surface px-2.5 py-2 text-left text-[11px] font-normal leading-snug text-primary shadow-lg"
            onMouseEnter={() => {
              if (isFinePointer()) openTip();
            }}
            onMouseLeave={scheduleClose}
          >
            {text}
          </span>,
          document.body,
        )
      : null;

  return (
    <span
      ref={wrapRef}
      className={cn("relative inline-flex align-middle", className)}
    >
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          touchOpenedRef.current = true;
          setOpen((v) => !v);
        }}
        onMouseEnter={() => {
          if (isFinePointer()) openTip();
        }}
        onMouseLeave={scheduleClose}
        onFocus={() => openTip()}
        onBlur={(e) => {
          const next = e.relatedTarget as Node | null;
          if (wrapRef.current?.contains(next)) return;
          if (tipRef.current?.contains(next)) return;
          close();
        }}
        onKeyDown={onBtnKey}
        className="ml-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/5 text-[10px] font-semibold leading-none text-primary/55 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-canvas"
      >
        <span aria-hidden>i</span>
      </button>
      {tooltip}
    </span>
  );
}
