"use client";

import { useFormState, useFormStatus } from "react-dom";
import { unlockCaseStudy, type GateState } from "@/app/work/actions";
import { Button } from "@/components/ui/Button";

const initialState: GateState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="mt-6 w-full" disabled={pending}>
      {pending ? "Checking…" : "Continue"}
    </Button>
  );
}

export function CaseStudyGate({ slug }: { slug: string }) {
  const [state, action] = useFormState(unlockCaseStudy, initialState);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-24">
      <p className="font-sora text-2xl font-semibold tracking-tight text-primary md:text-3xl">
        This case study is private.
      </p>
      <form action={action} className="mt-8" method="post">
        <input type="hidden" name="slug" value={slug} />
        <label htmlFor="case-study-password" className="sr-only">
          Password
        </label>
        <input
          id="case-study-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-border bg-canvas/60 px-4 py-3 text-sm text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40"
          placeholder="Password"
        />
        {state.error ? (
          <p role="alert" className="mt-3 text-sm text-primary/70">
            {state.error}
          </p>
        ) : null}
        <SubmitButton />
      </form>
    </section>
  );
}
