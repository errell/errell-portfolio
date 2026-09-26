"use client";

import Image from "next/image";
import type { PrototypeScreen } from "@/types/case-study";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  screens: PrototypeScreen[];
}

export function PrototypeGallery({ screens }: Props) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {screens.map((screen, i) => (
        <Reveal
          as="li"
          key={screen.id}
          delay={i * 0.05}
          className="flex h-full flex-col"
        >
          <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40">
            <div className="relative mx-auto mt-5 aspect-[784/1168] w-[min(100%,220px)] overflow-hidden rounded-[1.5rem] border border-border bg-canvas shadow-lg shadow-black/20">
              <Image
                src={screen.src}
                alt={`${screen.title}: ${screen.caption}`}
                width={784}
                height={1168}
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 220px"
                className="h-full w-full object-cover object-top"
              />
            </div>
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
  );
}
