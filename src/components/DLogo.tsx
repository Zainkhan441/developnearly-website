import { useId } from "react";

interface DLogoProps {
  className?: string;
  withWordmark?: boolean;
}

/** Original geometric "D" mark + DevelopNearly wordmark (inline SVG, never an image). */
export default function DLogo({ className = "h-9 w-9", withWordmark = false }: DLogoProps) {
  // Unique gradient id per logo instance. useId() returns strings like
  // "«r0»" - strip every non-alphanumeric so the id is safe inside url(#...).
  const gradientId = `dlogo-grad-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 64 64"
        className={className}
        role="img"
        aria-label="DevelopNearly logo"
      >
        <defs>
          <linearGradient id={gradientId} x1="12" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#10131C" />
        <rect width="64" height="64" rx="14" fill="none" stroke="rgba(255,255,255,0.08)" />
        <path
          d="M18 12h14a20 20 0 0 1 0 40H18V12zm8 8v24h6a12 12 0 0 0 0-24h-6z"
          fill={`url(#${gradientId})`}
        />
      </svg>
      {withWordmark ? (
        <span className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
          Develop<span className="text-bright">Nearly</span>
        </span>
      ) : null}
    </span>
  );
}
