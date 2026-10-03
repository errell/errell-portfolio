"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
    __turnstileOnLoad?: () => void;
  }
}

type Props = {
  siteKey: string;
  onToken: (token: string) => void;
  resetSignal: number;
};

export function TurnstileWidget({ siteKey, onToken, resetSignal }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;
  const { theme } = useTheme();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !window.turnstile || !containerRef.current) return;
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        "error-callback": () => onTokenRef.current(""),
      });
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const previous = window.__turnstileOnLoad;
      window.__turnstileOnLoad = () => {
        previous?.();
        renderWidget();
      };
      if (!document.querySelector("script[data-cf-turnstile]")) {
        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__turnstileOnLoad";
        script.async = true;
        script.defer = true;
        script.dataset.cfTurnstile = "true";
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme]);

  useEffect(() => {
    if (resetSignal === 0) return;
    onTokenRef.current("");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}
