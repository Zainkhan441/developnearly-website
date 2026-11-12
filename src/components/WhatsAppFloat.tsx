import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/923131134962?text=Hi%20DevelopNearly!%20I%20want%20to%20discuss%20a%20project.";

/** Floating WhatsApp button — always visible, opens a chat with DevelopNearly. */
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DevelopNearly on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
