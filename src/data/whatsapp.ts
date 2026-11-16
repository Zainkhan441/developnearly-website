import type { Choice } from "./services";
import { LENGTH_OPTIONS, QUALITY_OPTIONS, SERVICES, purposeOf } from "./services";

/** DevelopNearly's WhatsApp number, digits only, with country code. */
export const WHATSAPP_DIGITS = "923131134962";
export const WHATSAPP_DISPLAY = "+92 313 1134962";

/** Click-to-chat link that opens WhatsApp with the message already typed. */
export function waLink(text: string): string {
  return `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(text)}`;
}

const details = (choice: Choice) => {
  const parts: string[] = [];
  const q = QUALITY_OPTIONS[choice.service].find((o) => o.id === choice.quality);
  if (q) parts.push(`${q.label} ${choice.service === "video" ? "editing" : "design"}`);
  const l = LENGTH_OPTIONS.find((o) => o.id === choice.length);
  if (l) parts.push(`videos ${l.label.toLowerCase()}`);
  return parts.length ? ` (${parts.join(", ")})` : "";
};

const what = (choice: Choice) =>
  (choice.service === "video" ? `video editing for ${purposeOf(choice).label}` : `a website (${purposeOf(choice).label})`) +
  details(choice);

/** General "I want to talk" message, with the visitor's answers. */
export function introMessage(choice?: Choice): string {
  if (!choice) return "Hi DevelopNearly! I want to discuss a project.";
  return `Hi DevelopNearly! I'm interested in ${what(choice)}. My budget is ${choice.budgetLabel}.`;
}

export function packageMessage(choice: Choice, name: string, price: string, per?: string): string {
  const service = SERVICES[choice.service].name.toLowerCase();
  return `Hi DevelopNearly! I'd like the ${name} ${service} package (${price}${per ? ` ${per}` : ""}) for ${purposeOf(choice).label}${details(choice)}. Can we start?`;
}

export function sampleMessage(choice: Choice): string {
  return `Hi DevelopNearly! I'd like a free 30 sec – 1 min sample edit for ${purposeOf(choice).label}. What should I send you?`;
}

export function discountMessage(choice: Choice, name: string, price: string, per?: string): string {
  return `Hi DevelopNearly! I like the ${name} package (${price}${per ? ` ${per}` : ""}) for ${purposeOf(choice).label}${details(choice)}. Is there any discount you can offer?`;
}
