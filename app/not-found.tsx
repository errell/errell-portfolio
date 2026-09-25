"use client";

import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useT();
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-canvas flex-col items-center justify-center px-5 py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 font-sora text-3xl font-bold md:text-4xl">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-primary/60">{t.notFound.desc}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">{t.notFound.backHome}</Button>
        <Button href="/work" variant="secondary">
          {t.notFound.viewWork}
        </Button>
      </div>
    </div>
  );
}
