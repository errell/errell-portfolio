"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TurnstileWidget } from "@/components/contact/TurnstileWidget";
import { useT } from "@/lib/i18n";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "w-full rounded-xl border border-border bg-canvas/60 px-4 py-3 text-sm text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40";

type Source = "resume-view" | "cv-download";

function leaveGate(router: ReturnType<typeof useRouter>) {
  // Same behaviour as the case-study gate: go back to the previous screen.
  if (window.history.length > 1) {
    router.back();
    return;
  }
  router.push("/");
}

export function CvGate({ source }: { source: Source }) {
  const router = useRouter();
  const { t } = useT();
  const g = t.cvGate;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const leave = () => leaveGate(router);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    if (!EMAIL_RE.test(email)) {
      setError(g.invalidEmail);
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError(g.captchaRequired);
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/cv-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: String(form.get("website") || ""),
          source,
          turnstileToken,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(res.status === 429 ? g.tooMany : data.error || g.errorGeneric);
        setResetSignal((n) => n + 1);
        setPending(false);
        return;
      }
      if (source === "cv-download") {
        window.location.assign("/cv/download");
      } else {
        router.refresh();
      }
    } catch {
      setError(g.errorGeneric);
      setResetSignal((n) => n + 1);
      setPending(false);
    }
  }

  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-24">
      <button
        type="button"
        onClick={leave}
        aria-label={g.close}
        className="absolute right-5 top-8 inline-flex h-10 w-10 items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-surface/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          ×
        </span>
      </button>
      <p className="font-sora text-2xl font-semibold tracking-tight text-primary md:text-3xl">
        {source === "cv-download" ? g.titleDownload : g.titleView}
      </p>
      <p className="mt-3 text-sm text-primary/60">{g.intro}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-3" noValidate>
        <label htmlFor="cv-gate-email" className="sr-only">
          {g.email}
        </label>
        <input
          id="cv-gate-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          className={inputClass}
          placeholder={g.emailPlaceholder}
        />
        {/* Honeypot for bots; hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {TURNSTILE_SITE_KEY ? (
          <div className="pt-1">
            <TurnstileWidget
              siteKey={TURNSTILE_SITE_KEY}
              onToken={setTurnstileToken}
              resetSignal={resetSignal}
            />
          </div>
        ) : null}
        <p className="text-xs leading-relaxed text-primary/50">{g.consent}</p>
        {error ? (
          <p role="alert" className="text-sm text-primary/70">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="mt-3 w-full" disabled={pending}>
          {pending ? g.submitting : source === "cv-download" ? g.submitDownload : g.submitView}
        </Button>
      </form>
      <Button type="button" variant="ghost" className="mt-3 w-full" onClick={leave}>
        {g.back}
      </Button>
    </section>
  );
}
