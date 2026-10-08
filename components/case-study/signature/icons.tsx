import type { SVGProps } from "react";

// Small inline stroke icons for the signature prototype screens (24px grid).
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ChevronLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="m15 18-6-6 6-6" />
  </Svg>
);

export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const Camera = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.4-2h6.2l1.4 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" />
    <circle cx="12" cy="13" r="3.4" />
  </Svg>
);

export const IdCard = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <circle cx="8.5" cy="11" r="1.8" />
    <path d="M6 15.5c.6-1.2 1.5-1.8 2.5-1.8s1.9.6 2.5 1.8M14 10h4M14 13h3" />
  </Svg>
);

export const Bolt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 3 5 13.5h6L10 21l8-10.5h-6z" />
  </Svg>
);

export const BoltOff = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 3 9.8 7.2M8 9.6 5 13.5h6L10 21l3.4-4.5M15.6 13 18 10.5h-6l.6-3.5M3 3l18 18" />
  </Svg>
);

export const Shield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 5 6v5.5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Svg>
);

export const Lock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Svg>
);

export const Quote = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h10M4 17h13" />
  </Svg>
);

export const Fingerprint = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 11v2.5c0 2.5-.8 4.6-2 6.5" />
    <path d="M8.5 9.5a3.5 3.5 0 0 1 7 0v3.5c0 1.8-.3 3.4-.9 4.9" />
    <path d="M5.5 15.5c.3-1 .5-2 .5-3V10a6 6 0 0 1 10.6-3.8M18 10v2.5c0 2.5-.4 4.4-1 6" />
  </Svg>
);

export const Home = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 10.5 12 4l8 6.5" />
    <path d="M6 9v10.5h12V9" />
    <path d="M10 19.5V14h4v5.5" />
  </Svg>
);

export const Lifebuoy = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="m6 6 3.5 3.5M14.5 14.5 18 18M18 6l-3.5 3.5M9.5 14.5 6 18" />
  </Svg>
);

export const Plane = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.5 13.5 4 11l1.3-1.3 7.2.8 3.8-3.8a1.8 1.8 0 0 1 2.6 2.6l-3.8 3.8.8 7.2L14.6 21l-2.5-6.5" />
    <path d="m7.5 16.5-2 .5-.5 2 2-.5z" />
  </Svg>
);

export const PalmTree = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 9.5c0 4 .5 7.5 1.5 11M4 20.5h16" />
    <path d="M12 9.5C10.5 6.5 7 5.5 4.5 7c2.5.2 4.5 1.2 5.5 2.5" />
    <path d="M12 9.5c1.5-3 5-4 7.5-2.5-2.5.2-4.5 1.2-5.5 2.5" />
    <path d="M12 9.5c-.5-2.6.6-4.8 3-6-.6 1.8-.9 3.6-.5 5.2" />
    <path d="M12 9.5C9.6 9.3 7.4 10.7 6.5 13c1.8-1 3.6-1.5 5.5-1.5" />
  </Svg>
);

export const Info = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </Svg>
);
