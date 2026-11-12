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
  metadataBase: new URL("https://developnearly.com"),
  openGraph: {
    title: "DevelopNearly | Creative Digital Agency",
    description:
      "DevelopNearly helps businesses grow through premium video editing, modern website development, and intelligent AI automation solutions.",
    type: "website",
    siteName: "DevelopNearly",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevelopNearly | Creative Digital Agency",
    description:
      "DevelopNearly helps businesses grow through premium video editing, modern website development, and intelligent AI automation solutions.",
  },
  icons: {
    icon: "/favicon.svg",
  },
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
