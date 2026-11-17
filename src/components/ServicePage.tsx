"use client";

import type { Choice } from "../data/services";
import { purposeOf } from "../data/services";
import BeforeAfter from "./BeforeAfter";
import ClientStrip from "./ClientStrip";
import Contact from "./Contact";
import Faq from "./Faq";
import FreeOffer from "./FreeOffer";
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
}: {
  choice: Choice;
  year: number;
}) {
  const service = choice.service;
  return (
    <div className="min-h-full bg-ink font-sans text-white">
      <Nav choice={choice} />
      <main id="main-content">
        <ServiceHero choice={choice} />
        {service === "video" ? <BeforeAfter /> : null}
        <FreeOffer choice={choice} />
        {service === "web" ? <ClientStrip /> : null}
        <Work kind={service === "video" ? "video" : "website"} showFirst={purposeOf(choice).showFirst} />
        <Services service={service} />
        <Packages choice={choice} />
        <Process service={service} />
        <Why service={service} />
        <Faq choice={choice} />
        <Contact choice={choice} />
      </main>
      <Footer year={year} servicePage choice={choice} />
      <WhatsAppFloat choice={choice} />
    </div>
  );
}
