import { getCurrentYear } from "./year";
import About from "../components/About";
import ClientStrip from "../components/ClientStrip";
import Comparison from "../components/Comparison";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Process from "../components/Process";
import Services from "../components/Services";
import StartTeaser from "../components/StartTeaser";
import Testimonials from "../components/Testimonials";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Why from "../components/Why";
import Work from "../components/Work";

export default async function Home() {
  const year = await getCurrentYear();
  return (
    <div className="min-h-full bg-ink font-sans text-white">
      <Nav />
      <main id="main-content">
        <Hero />
        <ClientStrip />
        <Services />
        <Work />
        <Comparison />
        <Why />
        <Process />
        <About />
        <Testimonials />
        <StartTeaser />
        <Faq />
        <Contact />
      </main>
      <Footer year={year} />
      <WhatsAppFloat />
    </div>
  );
}
