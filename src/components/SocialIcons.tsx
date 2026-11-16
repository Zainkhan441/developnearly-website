type IconProps = {
  className?: string;
};

/**
 * Brand icons drawn as inline SVG. lucide-react 1.72 ships no brand icons,
 * so Instagram and TikTok live here instead of the icon library.
 * Both glyphs render in currentColor so they follow the footer link colour.
 */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.23-.97-.57-.26-1.11-.56-1.62-.88-.01 2.91.01 5.82-.02 8.73-.06 1.4-.71 2.93-1.9 3.79-1.44 1.05-3.34 1.34-5.03.87-1.7-.47-3.02-1.68-3.46-3.4-.44-1.73.1-3.66 1.34-4.87.96-.97 2.28-1.46 3.62-1.42.16 1.14.21 2.28.2 3.43-.6-.11-1.24-.06-1.78.3-.54.36-.78 1.06-.6 1.68.19.63.77 1.07 1.42 1.12.66.06 1.34-.19 1.72-.75.38-.56.34-1.31.21-1.96-.15-.77-.22-1.54-.2-2.31.01-2.53-.02-5.05.02-7.58.05-1.56.5-3.08 1.28-4.44.15-.26.31-.51.48-.76.01-.01.01-.01.02-.02z" />
    </svg>
  );
}
