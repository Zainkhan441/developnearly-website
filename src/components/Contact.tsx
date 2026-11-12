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

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  details: string;
}

const EMPTY: FormState = { name: "", email: "", company: "", service: "", budget: "", details: "" };

type Errors = Partial<Record<keyof FormState, string>>;

const inputClass =
  "w-full rounded-xl border border-white/10 bg-ink px-4 py-3.5 text-[15px] text-white placeholder:text-mist/60 transition-colors focus:border-bright focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [emailAppOpened, setEmailAppOpened] = useState(false);
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `Project Inquiry — ${form.service} — ${form.name}`;
    const bodyLines = [
      `Full Name: ${form.name}`,
      `Email Address: ${form.email}`,
      `Company Name: ${form.company || "—"}`,
      `Service Required: ${form.service}`,
      `Project Budget: ${form.budget}`,
      "",
      "Project Details:",
      form.details,
    ];
    const mailto = `mailto:developnearly@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    setForm(EMPTY);
    setErrors({});
    setEmailAppOpened(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("developnearly@gmail.com");
    } catch {
      // Fallback for browsers without clipboard permission.
      const ta = document.createElement("textarea");
      ta.value = "developnearly@gmail.com";
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
              No pressure, no obligation — just an honest conversation about your idea.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:developnearly@gmail.com"
                className="group flex min-h-14 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 transition-colors hover:border-bright/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-bright">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-widest text-mist">EMAIL US</span>
                  <span className="block font-medium text-white group-hover:text-bright">developnearly@gmail.com</span>
                </span>
              </a>
              <div className="flex min-h-14 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 opacity-80">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-bright">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-widest text-mist">WHATSAPP</span>
                  <span className="block font-medium text-white">WhatsApp — number coming soon</span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-white/10 bg-panel p-6 sm:p-8"
              aria-label="Project quote request form"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-white">
                    Full Name <span aria-hidden="true" className="text-bright">*</span>
                  </label>
                  <input id="contact-name" type="text" autoComplete="name" placeholder="Your name" value={form.name} onChange={set("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className={inputClass} />
                  {errors.name ? <p id="contact-name-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.name}</p> : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-white">
                    Email Address <span aria-hidden="true" className="text-bright">*</span>
                  </label>
                  <input id="contact-email" type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} className={inputClass} />
                  {errors.email ? <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.email}</p> : null}
                </div>
                <div>
                  <label htmlFor="contact-company" className="mb-2 block text-sm font-semibold text-white">
                    Company Name <span className="font-normal text-mist">(optional)</span>
                  </label>
                  <input id="contact-company" type="text" autoComplete="organization" placeholder="Your company" value={form.company} onChange={set("company")} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="contact-service" className="mb-2 block text-sm font-semibold text-white">
                    Service Required <span aria-hidden="true" className="text-bright">*</span>
                  </label>
                  <div className="relative">
                    <select id="contact-service" value={form.service} onChange={set("service")} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "contact-service-error" : undefined} className={`${inputClass} appearance-none bg-ink pr-11`}>
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
                    <select id="contact-budget" value={form.budget} onChange={set("budget")} aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "contact-budget-error" : undefined} className={`${inputClass} appearance-none bg-ink pr-11`}>
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
                  <textarea id="contact-details" rows={5} placeholder="Tell us about your project — goals, timeline, anything that matters." value={form.details} onChange={set("details")} aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? "contact-details-error" : undefined} className={`${inputClass} resize-y`} />
                  {errors.details ? <p id="contact-details-error" role="alert" className="mt-1.5 text-sm text-red-400">{errors.details}</p> : null}
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-bright hover:shadow-[0_12px_40px_rgba(59,130,246,0.5)] sm:w-auto"
              >
                <Send className="h-5 w-5" />
                Send Project Inquiry
              </button>

              {emailAppOpened ? (
                <div role="status" className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-sm leading-relaxed text-emerald-200">
                  <p className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>
                      Your email app should now open with your inquiry pre-filled — just press send
                      in your email app to deliver it to developnearly@gmail.com. We will reply as
                      soon as we can.
                    </span>
                  </p>
                  <p className="mt-3 pl-[30px] text-emerald-100/80">
                    If no email app opened, you can reach us directly instead:
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 pl-[30px]">
                    <a
                      href="mailto:developnearly@gmail.com"
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 font-semibold text-emerald-100 transition-colors hover:bg-emerald-500/30"
                    >
                      <Mail className="h-4 w-4" />
                      developnearly@gmail.com
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
              ) : (
                <p className="mt-5 text-sm leading-relaxed text-mist">
                  This form opens your own email app with everything pre-filled — nothing is
                  sent automatically.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
