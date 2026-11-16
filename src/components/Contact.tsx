"use client";

import { Check, Copy, Mail, Send, Sparkles } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import type { Choice } from "../data/services";
import { SERVICES as SERVICE_INFO, purposeOf } from "../data/services";
import { CHOOSE_PACKAGE_EVENT } from "./Packages";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { WHATSAPP_DISPLAY as WHATSAPP_NUMBER, introMessage, waLink } from "../data/whatsapp";


const CONTACT_EMAIL = "developnearly@gmail.com";

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  service: string;
  budget: string;
  details: string;
  honeypot: string;
}

const EMPTY: FormState = { name: "", email: "", whatsapp: "", service: "", budget: "", details: "", honeypot: "" };

type Errors = Partial<Record<keyof FormState, string>>;

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-ink px-4 py-3.5 text-[15px] text-white placeholder:text-mist/60 transition-colors focus:border-bright focus:outline-none";

export default function Contact({ choice }: { choice: Choice }) {
  const info = SERVICE_INFO[choice.service];
  const initial: FormState = {
    ...EMPTY,
    service: info.formValue,
    budget: choice.budgetLabel,
  };
  const [pkg, setPkg] = useState("");
  const WHATSAPP_URL = waLink(introMessage(choice));
  const [form, setForm] = useState<FormState>(initial);

  // "Choose <package>" on the Packages section prefills the form.
  useEffect(() => {
    const onChoose = (e: Event) => {
      setPkg((e as CustomEvent<string>).detail);
      window.setTimeout(() => document.getElementById("contact-name")?.focus({ preventScroll: true }), 600);
    };
    window.addEventListener(CHOOSE_PACKAGE_EVENT, onChoose);
    return () => window.removeEventListener(CHOOSE_PACKAGE_EVENT, onChoose);
  }, [info.formValue]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address";
    if (form.whatsapp.trim() && form.whatsapp.replace(/[^0-9]/g, "").length < 7)
      next.whatsapp = "Please enter a valid WhatsApp number, with country code";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");
    try {
      // Real delivery: the inquiry is POSTed to our own /api/contact route,
      // which forwards it to our Google Apps Script backend. The email is
      // sent from developnearly@gmail.com via Zain's own Gmail account,
      // no third-party form service involved.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: "",
          service: form.service,
          budget: form.budget,
          // The quiz answers travel with the message so every inquiry has the
          // full picture, even when the visitor writes nothing else.
          message: [
            `For: ${purposeOf(choice).label}`,
            `Budget: ${choice.budgetLabel}`,
            pkg ? `Package: ${pkg}` : "",
            form.whatsapp.trim() ? `WhatsApp: ${form.whatsapp.trim()}` : "",
            "",
            form.details.trim() || "(no extra details)",
          ]
            .filter((line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""))
            .join("\n"),
          honeypot: form.honeypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data || data.ok !== true) {
        throw new Error("Form delivery failed");
      }
      setSentTo(form.email.trim());
      setForm(initial);
      setPkg("");
      setErrors({});
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // Fallback for browsers without clipboard permission.
      const ta = document.createElement("textarea");
      ta.value = CONTACT_EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" aria-label="Contact and get a quote" className="scroll-mt-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              LET&apos;S TALK
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Message us on
              <br />
              <span className="text-[#25d366]">WhatsApp</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist sm:text-lg">
              The fastest way to start, your answers are already typed in the message,
              just press send and we will reply with a clear, fixed price
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-[#25d366] px-6 text-lg font-bold text-ink shadow-[0_16px_50px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon className="h-7 w-7" />
              Chat on WhatsApp
            </a>
            <p className="mt-3 text-center text-sm text-mist">{WHATSAPP_NUMBER}</p>

            <div className="mt-8">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex min-h-14 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 transition-colors hover:border-bright/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-bright">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-widest text-mist">OR EMAIL US</span>
                  <span className="block font-medium text-white group-hover:text-bright">{CONTACT_EMAIL}</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-white/10 bg-panel p-6 sm:p-8"
              aria-label="Project quote request form"
            >
              {/* Honeypot: invisible to humans, catches bots. */}
              <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="contact-website">URL</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.honeypot}
                  onChange={set("honeypot")}
                />
              </div>
              <p className="mb-5 font-display text-xl font-bold text-white">No WhatsApp? Send us an email instead</p>
              {pkg ? (
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-bright/40 bg-[#2563eb]/15 px-4 py-2 text-sm font-semibold text-white">
                  <Sparkles className="h-4 w-4 text-bright" />
                  Selected: {pkg}
                </p>
              ) : null}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-white">
                    Full Name <span aria-hidden="true" className="text-bright">*</span>
                  </label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" value={form.name} onChange={set("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className={inputClass} />
                  {errors.name ? <p id="contact-name-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.name}</p> : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-white">
                    Email Address <span aria-hidden="true" className="text-bright">*</span>
                  </label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} className={inputClass} />
                  {errors.email ? <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.email}</p> : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-whatsapp" className="mb-2 block text-sm font-semibold text-white">
                    WhatsApp Number <span className="font-normal text-mist">(optional, for a faster reply)</span>
                  </label>
                  <input id="contact-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="+1 555 123 4567" value={form.whatsapp} onChange={set("whatsapp")} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "contact-whatsapp-error" : undefined} className={inputClass} />
                  {errors.whatsapp ? <p id="contact-whatsapp-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.whatsapp}</p> : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-details" className="mb-2 block text-sm font-semibold text-white">
                    Anything else we should know? <span className="font-normal text-mist">(optional)</span>
                  </label>
                  <textarea id="contact-details" name="details" rows={4} placeholder={choice.service === "video" ? "Your channel link, deadline, style you like…" : "Your current site (if any), deadline, designs you like…"} value={form.details} onChange={set("details")} aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? "contact-details-error" : undefined} className={`${inputClass} resize-y`} />
                  {errors.details ? <p id="contact-details-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.details}</p> : null}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
              >
                <Send className="h-5 w-5" />
                {status === "sending" ? "Sending…" : "Get My Quote"}
              </button>

              {status === "sent" ? (
                <div role="status" className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-sm leading-relaxed text-emerald-200">
                  <p className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>
                      Message sent, it is in our inbox now and we will reply to{" "}
                      <strong>{sentTo}</strong> as soon as we can
                    </span>
                  </p>
                  <p className="mt-3 pl-[30px] text-emerald-100/80">
                    Prefer to talk right away? Message us on WhatsApp:
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 pl-[30px]">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#25d366]/20 px-4 py-2 font-semibold text-emerald-100 transition-colors hover:bg-[#25d366]/30"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {WHATSAPP_NUMBER}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-emerald-400/40 px-4 py-2 font-semibold text-emerald-100 transition-colors hover:bg-emerald-500/15"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy email"}
                    </button>
                  </div>
                </div>
              ) : status === "error" ? (
                <div role="alert" className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3.5 text-sm leading-relaxed text-amber-200">
                  <p>
                    Something went wrong while sending, your message was not delivered,
                    please reach us directly instead:
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#25d366]/20 px-4 py-2 font-semibold text-amber-100 transition-colors hover:bg-[#25d366]/30"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp {WHATSAPP_NUMBER}
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 font-semibold text-amber-100 transition-colors hover:bg-amber-500/30"
                    >
                      <Mail className="h-4 w-4" />
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-sm leading-relaxed text-mist">
                  Your answers are sent with your message, so you do not have to explain anything twice
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
