"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { PrototypeScreen } from "@/types/case-study";
import { PrototypeLightbox } from "@/components/case-study/PrototypeLightbox";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  screens: PrototypeScreen[];
}

export function PrototypeGallery({ screens }: Props) {
  const [active, setActive] = useState<PrototypeScreen | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {screens.map((screen, i) => (
          <Reveal
            as="li"
            key={screen.id}
            delay={i * 0.05}
            className="flex h-full flex-col"
          >
            <figure className="dt-card flex h-full flex-col overflow-hidden">
              <button
                type="button"
                onClick={() => setActive(screen)}
                aria-label={`View larger: ${screen.title}`}
                className="group relative mx-auto mt-5 aspect-[360/800] w-[min(100%,200px)] cursor-zoom-in overflow-hidden rounded-[1.65rem] border border-black/10 bg-[#FFFBFE] shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(255,255,255,0.06)] ring-1 ring-white/10 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas hover:scale-[1.02]"
              >
                <Image
                  src={screen.src}
                  alt={`${screen.title}: ${screen.caption}`}
                  width={720}
                  height={1600}
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 200px"
                  className="h-full w-full object-cover object-top transition-opacity group-hover:opacity-95"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-2 pb-2.5 pt-8 text-center text-[10px] font-medium tracking-wide text-white opacity-0 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-100"
                >
                  Expand
                </span>
              </button>
              <figcaption className="flex flex-1 flex-col gap-2 p-5 pt-4">
                <Tag variant="accent" className="self-start">
                  {screen.decision}
                </Tag>
                <h4 className="font-sora text-sm font-semibold text-primary">
                  {screen.title}
                </h4>
                <p className="text-xs leading-relaxed text-primary/60">
                  {screen.caption}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      {active ? (
        <PrototypeLightbox screen={active} onClose={close} />
      ) : null}
    </>
  );
}
