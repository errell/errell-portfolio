"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useT } from "@/lib/i18n";

// Minimal typing for the Cal.com embed global.
type CalFn = ((...args: unknown[]) => void) & {
  ns?: Record<string, (...args: unknown[]) => void>;
  loaded?: boolean;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/**
 * Cal.com inline booking embed. Loads the official embed script and mounts an
 * inline calendar. If it fails to load (blocked, offline, or username not set
 * up) a direct booking link is shown instead.
 */
export function CalEmbed() {
  const { t } = useT();
  const [failed, setFailed] = useState(false);
  const username = site.calUsername;
  const calLink = `${username}/30min`;
  const directUrl = `https://cal.com/${calLink}`;

  useEffect(() => {
    if (!username) {
      setFailed(true);
      return;
    }

    let cancelled = false;
    const SCRIPT_SRC = "https://app.cal.com/embed/embed.js";

    function initCal() {
      const Cal = window.Cal;
      if (!Cal) {
        setFailed(true);
        return;
      }
      Cal("init", "30min", { origin: "https://cal.com" });
      const ns = Cal.ns?.["30min"];
      if (!ns) {
        setFailed(true);
        return;
      }
      ns("inline", {
        elementOrSelector: "#cal-inline",
        calLink,
        layout: "month_view",
      });
      ns("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }

    // The official embed snippet, condensed into a typed loader.
    function bootstrap() {
      if (window.Cal) {
        initCal();
        return;
      }
      const cal: CalFn = function (...args: unknown[]) {
        (cal.q = cal.q || []).push(args);
      } as CalFn;
      cal.ns = {};
      window.Cal = cal;

      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        if (!cancelled) initCal();
      };
      script.onerror = () => {
        if (!cancelled) setFailed(true);
      };
      document.head.appendChild(script);
    }

    bootstrap();

    // Safety net: if no calendar iframe appears, surface the fallback.
    const timeout = setTimeout(() => {
      const iframe = document.querySelector("#cal-inline iframe");
      if (!iframe && !cancelled) setFailed(true);
    }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [username, calLink]);

  if (failed) {
    return (
      <div className="rounded-2xl border border-border bg-surface/40 p-8 text-center">
        <p className="text-sm text-primary/70">{t.contact.bookFallback}</p>
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-onAccent hover:bg-accent/90"
        >
          {t.contact.bookCta}
        </a>
      </div>
    );
  }

  return (
    <div
      id="cal-inline"
      className="min-h-[560px] w-full overflow-hidden rounded-2xl border border-border bg-surface/40"
      style={{ height: "560px" }}
    />
  );
}
