import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  /** If a real photo exists at this path it will be used; otherwise a silhouette shows. */
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

/**
 * Circular avatar. Until a real photo is dropped at /public/images/profile.jpg
 * pass no `src` (or a missing path) to render the styled silhouette placeholder.
 */
export function Avatar({ src, alt, size = 200, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border border-border bg-surface",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"
      />
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      ) : (
        <svg
          viewBox="0 0 200 200"
          className="relative h-full w-full text-primary/25"
          role="img"
          aria-label={`${alt} (photo placeholder)`}
        >
          <circle cx="100" cy="78" r="38" fill="currentColor" />
          <path
            d="M40 180c0-33 27-56 60-56s60 23 60 56"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
}
