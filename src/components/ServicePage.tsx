"use client";

import type { Choice } from "../data/services";
import ClientStrip from "./ClientStrip";
import Contact from "./Contact";
import Faq from "./Faq";
import Footer from "./Footer";
import Nav from "./Nav";
import Packages from "./Packages";
import Process from "./Process";
import ServiceHero from "./ServiceHero";
import Services from "./Services";
import WhatsAppFloat from "./WhatsAppFloat";
import Why from "./Why";
import Work from "./Work";

/** One page per service: only the work, packages and FAQs for that service. */
export default function ServicePage({
  choice,
  year,
  onChangeAnswers,
}: {
  choice: Choice;
  year: number;
  onChangeAnswers: () => void;
}) {
  const service = choice.service;
  return (
    <div className="min-h-full bg-ink font-sans text-white">
      <Nav choice={choice} onChangeAnswers={onChangeAnswers} />
      <main id="main-content">
        <ServiceHero choice={choice} />
        {service === "web" ? <ClientStrip /> : null}
        <Work kind={service === "video" ? "video" : "website"} />
        <Services service={service} />
        <Packages choice={choice} />
        <Process service={service} />
        <Why />
        <Faq service={service} />
        <Contact choice={choice} />
      </main>
      <Footer year={year} servicePage />
      <WhatsAppFloat />
    </div>
  );
}
