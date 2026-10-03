"use client";

import { usePathname } from "next/navigation";

/**
 * Soft color orbs behind the page. Home gets the full field; other routes
 * keep a quieter wash. Reduced motion freezes them in globals.css.
 */
export function Bokeh() {
  const pathname = usePathname();
  const quiet = pathname !== "/";

  return (
    <div className={quiet ? "bokeh bokeh-quiet" : "bokeh"} aria-hidden="true">
      <span className="orb orb-1" />
      <span className="orb orb-2" />
      <span className="orb orb-3" />
      <span className="orb orb-4" />
      <span className="orb orb-5" />
      <span className="orb orb-6" />
      <span className="orb orb-7" />
      <span className="bokeh-scrim" />
    </div>
  );
}
