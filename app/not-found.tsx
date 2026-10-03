"use client";

import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useT();
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">404</p>
      <h1 className="mt-4 font-sans text-3xl font-medium tracking-[-0.035em] md:text-4xl">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-muted">{t.notFound.desc}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">{t.notFound.backHome}</Button>
        <Button href="/work" variant="secondary">
          {t.notFound.viewWork}
        </Button>
      </div>
    </div>
  );
}
