"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

interface InfoTooltipProps {
  /** Plain-language explanation shown in the tooltip */
  text: string;
  /** Accessible name for the trigger, e.g. "What is CSAT?" */
  label: string;
  className?: string;
}

export function InfoTooltip({ text, label, className }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const tipId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const onBtnKey = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      close();
    }
  };

  return (
    <span ref={wrapRef} className={cn("relative inline-flex align-middle", className)}>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle();
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!wrapRef.current?.contains(e.relatedTarget as Node)) close();
        }}
        onKeyDown={onBtnKey}
        className="ml-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/5 text-[10px] font-semibold leading-none text-primary/55 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-canvas"
      >
        <span aria-hidden>i</span>
      </button>
      {open ? (
        <span
          id={tipId}
          role="tooltip"
          className="absolute left-1/2 top-[calc(100%+6px)] z-50 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-border bg-surface px-2.5 py-2 text-left text-[11px] font-normal leading-snug text-primary shadow-lg"
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}
