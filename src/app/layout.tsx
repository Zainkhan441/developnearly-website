import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevelopNearly | Creative Digital Agency",
  description:
    "DevelopNearly helps businesses grow through premium video editing, modern website development, and intelligent AI automation solutions.",
  metadataBase: new URL("https://developnearly-website.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DevelopNearly | Creative Digital Agency",
    description:
      "DevelopNearly helps businesses grow through premium video editing, modern website development, and intelligent AI automation solutions.",
    type: "website",
    siteName: "DevelopNearly",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DevelopNearly — We turn ideas into reality.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevelopNearly | Creative Digital Agency",
    description:
      "DevelopNearly helps businesses grow through premium video editing, modern website development, and intelligent AI automation solutions.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevelopNearly",
  url: "https://developnearly-website.vercel.app",
  email: "developnearly@gmail.com",
  description:
    "DevelopNearly helps businesses grow through premium video editing, modern website development, and intelligent AI automation solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* No-JS fallback: framer-motion renders the hero at opacity 0 until
            JS runs. Without JS, force the hero visible. */}
        <noscript>
          <style>{`.hero-anim, .hero-anim * { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
