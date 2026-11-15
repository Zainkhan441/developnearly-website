"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/923131134962?text=Hi%20DevelopNearly!%20I%20want%20to%20discuss%20a%20project.";

/**
 * Floating WhatsApp button - always visible, opens a chat with DevelopNearly.
 * It must never cover a tappable control, so:
 * - on small screens it sits bottom-LEFT (FAQ expand buttons, portfolio
 *   arrows and the contact form's right corner all live on the right);
 * - it hides entirely (animated slide-down, no layout shift) while the
 *   contact or FAQ section is in view, since those sections already offer
 *   their own contact controls;
 * - on desktop it keeps its bottom-right spot, also hidden over contact/FAQ.
 */
export default function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sections = ["contact", "faq"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => setHidden(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.05 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DevelopNearly on WhatsApp"
      title="Chat on WhatsApp"
      className={`fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-5 sm:left-auto sm:right-5 sm:h-14 sm:w-14 ${
        hidden ? "pointer-events-none translate-y-20 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
