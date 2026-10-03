"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import type { PrototypeScreen } from "@/types/case-study";

interface Props {
  screen: PrototypeScreen;
  onClose: () => void;
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function PrototypeLightbox({ screen, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const captionId = useId();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the close button on open
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialogRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus();
    };
  }, [handleClose]);

  const onBackdropClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const onDialogKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleClose();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 sm:p-6"
      role="presentation"
      onClick={onBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={captionId}
        tabIndex={-1}
        onKeyDown={onDialogKeyDown}
        className="relative flex max-h-[min(92vh,920px)] w-full max-w-lg flex-col items-center gap-4 outline-none"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={handleClose}
          aria-label="Close lightbox"
          className="absolute -right-1 -top-1 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/70 text-accent shadow-lg backdrop-blur-sm transition-colors hover:bg-accent hover:text-onAccent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:-right-2 sm:-top-2"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 3.5l9 9M12.5 3.5l-9 9"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative mx-auto aspect-[360/800] w-[min(100%,min(72vw,340px))] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#FFFBFE] shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
          <Image
            src={screen.src}
            alt={`${screen.title}: ${screen.caption}`}
            width={720}
            height={1600}
            sizes="(max-width: 640px) 72vw, 340px"
            className="h-full w-full object-cover object-top"
            priority
          />
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-center backdrop-blur-md">
          <h3
            id={titleId}
            className="font-sora text-sm font-semibold text-primary"
          >
            {screen.title}
          </h3>
          <p
            id={captionId}
            className="mt-1 text-xs leading-relaxed text-primary/65"
          >
            {screen.caption}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
