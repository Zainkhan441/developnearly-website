import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Nav from "../components/Nav";
import Process from "../components/Process";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Why from "../components/Why";
import Work from "../components/Work";

export default function Home() {
  return (
    <div className="min-h-full bg-ink font-sans text-white">
      <Nav />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Why />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
