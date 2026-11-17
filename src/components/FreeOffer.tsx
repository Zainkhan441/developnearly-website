"use client";

import { Check, Clock, Gift, Link2, Loader2, Send, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Choice } from "../data/services";
import { SERVICES, purposeOf } from "../data/services";
import { waLink } from "../data/whatsapp";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-ink px-4 py-3.5 text-[15px] text-white placeholder:text-mist/60 transition-colors focus:border-emerald-400 focus:outline-none";

const COPY = {
  video: {
    eyebrow: "FREE SAMPLE EDIT",
    title: "See your video edited, before you pay a cent",
    sub: "Send us a script, voiceover or raw footage. We edit a 30 second to 1 minute sample for free, and you decide if you like it.",
    steps: [
      { icon: Link2, title: "Share a link", text: "Google Drive, Dropbox or YouTube, anything works" },
      { icon: Clock, title: "We edit it in 48 hours", text: "In the style you pick, with music and captions" },
      { icon: Check, title: "You decide", text: "Love it? Let's work. Not for you? No hard feelings" },
    ],
    linkLabel: "Link to your script, voiceover or footage",
    linkPlaceholder: "https://drive.google.com/…",
    notesLabel: "Anything we should know? (optional)",
    notesPlaceholder: "Style you like, a channel you want to match, video length…",
    button: "Get my free sample",
    service: "Free sample edit",
    done: "Got it! We will send your free sample to",
    wa: "Hi DevelopNearly! I'd like a free sample edit. Here is my link: ",
  },
  web: {
    eyebrow: "FREE HOMEPAGE MOCKUP",
    title: "See your new website before you decide",
    sub: "Tell us about your business. We design a free homepage mockup in 48 hours, so you can see exactly what you would get.",
    steps: [
      { icon: Link2, title: "Share your business", text: "Your current website, or just your business name" },
      { icon: Clock, title: "We design it in 48 hours", text: "A real homepage design, made for your business" },
      { icon: Check, title: "You decide", text: "Like it? We build it. If not, it costs you nothing" },
    ],
    linkLabel: "Your current website, or your business name",
    linkPlaceholder: "yourbusiness.com or \"Sunny Hair Salon, London\"",
    notesLabel: "What does your business do? (optional)",
    notesPlaceholder: "What you sell, who your customers are, a website you like…",
    button: "Get my free mockup",
    service: "Free homepage mockup",
    done: "Got it! We will send your free mockup to",
    wa: "Hi DevelopNearly! I'd like a free homepage mockup for: ",
  },
} as const;

/** Lead magnet right under the hero: a free sample edit or a free homepage mockup. */
export default function FreeOffer({ choice }: { choice: Choice }) {
  const c = COPY[choice.service];
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (link.trim().length < 3) return setError(choice.service === "video" ? "Please add a link to your script, voiceover or footage" : "Please add your website or business name");
    if (name.trim().length < 2) return setError("Please enter your name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Please enter a valid email address");
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: "",
          service: `${c.service} (${SERVICES[choice.service].formValue})`,
          budget: choice.budgetLabel || "Not given",
          message: [
            `REQUEST: ${c.service}`,
            `For: ${purposeOf(choice).label}`,
            `Link / business: ${link.trim()}`,
            "",
            notes.trim() || "(no extra notes)",
          ].join("\n"),
          honeypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data || data.ok !== true) throw new Error("failed");
      setSentTo(email.trim());
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="free-sample" className="relative scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-500/[0.12] via-ink to-ink p-6 sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-emerald-300">
                  <Gift className="h-3.5 w-3.5" />
                  {c.eyebrow}
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{c.title}</h2>
                <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-mist">{c.sub}</p>

                <ol className="mt-8 space-y-5">
                  {c.steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
                        <s.icon className="h-5 w-5" />
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-ink">
                          {i + 1}
                        </span>
                      </span>
                      <div>
                        <p className="font-semibold text-white">{s.title}</p>
                        <p className="mt-0.5 text-sm text-mist">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <p className="mt-8 flex items-center gap-2 text-sm text-emerald-300/90">
                  <Sparkles className="h-4 w-4" />
                  No card, no contract, no catch
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-ink/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-7">
                {status === "sent" ? (
                  <div className="flex h-full flex-col items-center justify-center py-8 text-center" role="status">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <Check className="h-8 w-8" />
                    </span>
                    <p className="mt-5 font-display text-2xl font-bold text-white">Request received</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-mist">
                      {c.done} <span className="text-white">{sentTo}</span> within 48 hours.
                    </p>
                    <a
                      href={waLink(`${c.wa}${link.trim()}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-400/40 px-5 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/10"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Want it faster? Message us
                    </a>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="fo-link" className="mb-1.5 block text-sm font-medium text-white">
                        {c.linkLabel}
                      </label>
                      <input
                        id="fo-link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder={c.linkPlaceholder}
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fo-name" className="mb-1.5 block text-sm font-medium text-white">
                          Your name
                        </label>
                        <input
                          id="fo-name"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="fo-email" className="mb-1.5 block text-sm font-medium text-white">
                          Email for your {choice.service === "video" ? "sample" : "mockup"}
                        </label>
                        <input
                          id="fo-email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="fo-notes" className="mb-1.5 block text-sm font-medium text-white">
                        {c.notesLabel}
                      </label>
                      <textarea
                        id="fo-notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={c.notesPlaceholder}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="fo-url">URL</label>
                      <input
                        id="fo-url"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {error ? (
                      <p className="text-sm text-rose-300" role="alert">
                        {error}
                      </p>
                    ) : null}
                    {status === "error" ? (
                      <p className="text-sm text-rose-300" role="alert">
                        Something went wrong. Please try again, or message us on WhatsApp.
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-emerald-400 disabled:opacity-70"
                    >
                      {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      {status === "sending" ? "Sending…" : c.button}
                    </button>
                    <a
                      href={waLink(`${c.wa}${link.trim()}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-10 items-center justify-center gap-2 text-sm font-medium text-mist transition-colors hover:text-white"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Or send it on WhatsApp
                    </a>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
