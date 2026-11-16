import type { ServiceKey } from "../data/services";
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
export default function ServicePage({ service, year }: { service: ServiceKey; year: number }) {
  return (
    <div className="min-h-full bg-ink font-sans text-white">
      <Nav service={service} />
      <main id="main-content">
        <ServiceHero service={service} />
        {service === "web" ? <ClientStrip /> : null}
        <Work kind={service === "video" ? "video" : "website"} />
        <Services service={service} />
        <Packages service={service} />
        <Process service={service} />
        <Why />
        <Faq service={service} />
        <Contact service={service} />
      </main>
      <Footer year={year} servicePage />
      <WhatsAppFloat />
    </div>
  );
}
