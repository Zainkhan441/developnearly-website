"use client";

import { Check, ChevronDown, Copy, Mail, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

const SERVICES = [
  "Video Editing",
  "Website Development",
  "AI & Automation",
  "Multiple Services",
  "Other",
] as const;

const BUDGETS = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$3,000",
  "$3,000+",
  "Not Sure Yet",
] as const;

const CONTACT_EMAIL = "developnearly@gmail.com";
const WHATSAPP_NUMBER = "+92 313 1134962";
const WHATSAPP_URL =
  "https://wa.me/923131134962?text=Hi%20DevelopNearly!%20I%20want%20to%20discuss%20a%20project.";

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  details: string;
  honeypot: string;
}

const EMPTY: FormState = { name: "", email: "", company: "", service: "", budget: "", details: "", honeypot: "" };

type Errors = Partial<Record<keyof FormState, string>>;

type SubmitStatus = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-ink px-4 py-3.5 text-[15px] text-white placeholder:text-mist/60 transition-colors focus:border-bright focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
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
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.service) next.service = "Please choose a service.";
    if (!form.budget) next.budget = "Please choose a budget range.";
    if (form.details.trim().length < 10)
      next.details = "Please tell us a little more about your project (at least 10 characters).";
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
          company: form.company.trim(),
          service: form.service,
          budget: form.budget,
          message: form.details.trim(),
          honeypot: form.honeypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data || data.ok !== true) {
        throw new Error("Form delivery failed");
      }
      setSentTo(form.email.trim());
      setForm(EMPTY);
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
              GET A QUOTE
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Have an Idea?
              <br />
              Let&apos;s Build Something <span className="text-gradient-blue">Meaningful.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist sm:text-lg">
              Tell us about your project and we will get back to you with next steps.
              No pressure, no obligation. Just an honest conversation about your idea.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex min-h-14 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 transition-colors hover:border-bright/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-bright">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-widest text-mist">EMAIL US</span>
                  <span className="block font-medium text-white group-hover:text-bright">{CONTACT_EMAIL}</span>
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-14 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 transition-colors hover:border-[#25d366]/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25d366]/15 text-[#25d366]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-widest text-mist">WHATSAPP</span>
                  <span className="block font-medium text-white group-hover:text-[#25d366]">{WHATSAPP_NUMBER}</span>
                  <span className="block text-xs text-mist">Tap to chat on WhatsApp</span>
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
                <label htmlFor="contact-website">Website</label>
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
                <div>
                  <label htmlFor="contact-company" className="mb-2 block text-sm font-semibold text-white">
                    Company Name <span className="font-normal text-mist">(optional)</span>
                  </label>
                  <input id="contact-company" name="company" type="text" autoComplete="organization" placeholder="Your company" value={form.company} onChange={set("company")} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="contact-service" className="mb-2 block text-sm font-semibold text-white">
                    Service Required <span aria-hidden="true" className="text-bright">*</span>
                  </label>
                  <div className="relative">
                    <select id="contact-service" name="service" value={form.service} onChange={set("service")} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "contact-service-error" : undefined} className={`${inputClass} appearance-none bg-ink pr-11`}>
                      <option value="" disabled>Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mist" />
                  </div>
                  {errors.service ? <p id="contact-service-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.service}</p> : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-budget" className="mb-2 block text-sm font-semibold text-white">
                    Project Budget <span aria-hidden="true" className="text-bright">*</span>
                  </label>
                  <div className="relative">
                    <select id="contact-budget" name="budget" value={form.budget} onChange={set("budget")} aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "contact-budget-error" : undefined} className={`${inputClass} appearance-none bg-ink pr-11`}>
                      <option value="" disabled>Select a budget range</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mist" />
                  </div>
                  {errors.budget ? <p id="contact-budget-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.budget}</p> : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-details" className="mb-2 block text-sm font-semibold text-white">
                    Project Details <span aria-hidden="true" className="text-bright">*</span>
                  </label>
                  <textarea id="contact-details" name="details" rows={5} placeholder="Tell us about your project: goals, timeline, anything that matters." value={form.details} onChange={set("details")} aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? "contact-details-error" : undefined} className={`${inputClass} resize-y`} />
                  {errors.details ? <p id="contact-details-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.details}</p> : null}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
              >
                <Send className="h-5 w-5" />
                {status === "sending" ? "Sending…" : "Send Project Inquiry"}
              </button>

              {status === "sent" ? (
                <div role="status" className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-sm leading-relaxed text-emerald-200">
                  <p className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>
                      Message sent. It is in our inbox now. We will reply to{" "}
                      <strong>{sentTo}</strong> as soon as we can.
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
                      <MessageCircle className="h-4 w-4" />
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
                    Something went wrong while sending. Your message was not delivered.
                    Please reach us directly instead:
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#25d366]/20 px-4 py-2 font-semibold text-amber-100 transition-colors hover:bg-[#25d366]/30"
                    >
                      <MessageCircle className="h-4 w-4" />
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
                  Your message goes straight to our inbox. No email app needed.
                  Prefer WhatsApp? Tap the number above and chat with us directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
