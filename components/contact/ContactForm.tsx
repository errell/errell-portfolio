"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-canvas/60 px-4 py-3 text-sm text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40";
const labelClass = "block text-sm font-medium text-primary/80";

export function ContactForm() {
  const { t } = useT();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || c.errorGeneric);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : c.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent/40 bg-accent/[0.06] p-8 text-center"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 font-sora text-lg font-semibold">{c.successTitle}</h3>
        <p className="mt-2 text-sm text-primary/60">{c.successDesc}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent hover:underline"
        >
          {c.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className={labelClass}>
          {c.name} <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={cn(inputClass, "mt-1.5")}
          placeholder={c.namePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {c.email} <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={cn(inputClass, "mt-1.5")}
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          {c.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={cn(inputClass, "mt-1.5")}
          placeholder={c.optional}
        />
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          {c.subject}
        </label>
        <select id="subject" name="subject" className={cn(inputClass, "mt-1.5")}>
          {c.subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {c.message} <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          rows={5}
          className={cn(inputClass, "mt-1.5 resize-y")}
          placeholder={c.messagePlaceholder}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl border border-amber/40 bg-amber/[0.06] px-4 py-3 text-sm text-amber"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-onAccent transition-all hover:bg-accent/90 hover:shadow-[0_0_24px_-4px_rgba(0,212,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-60"
      >
        {status === "submitting" ? c.sending : c.send}
      </button>
    </form>
  );
}
