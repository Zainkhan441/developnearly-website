import Link from "next/link";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { getCurrentYear } from "../year";

export const metadata = {
  title: "Terms of Service | DevelopNearly",
  description: "The terms under which DevelopNearly provides its services.",
};

export default async function TermsPage() {
  const year = await getCurrentYear();
  return (
    <div className="min-h-full bg-ink font-sans text-white">
      <Nav />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-bright">TERMS OF SERVICE</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-mist">Last updated: November 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-white/85">
          <section>
            <h2 className="font-display text-2xl font-bold text-white">Services</h2>
            <p className="mt-3">
              DevelopNearly provides video editing, website development, and AI and
              automation services. The exact scope, deliverables, timeline, and price of
              each project are agreed with the client in writing (by email) before work
              begins.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Quotes and payment</h2>
            <p className="mt-3">
              Any price given before a project is agreed is an estimate based on the
              information available at the time. Payment terms are agreed per project
              before work begins.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Client responsibilities</h2>
            <p className="mt-3">
              Clients are responsible for providing the content and materials needed for
              their project (such as text, images, footage, and brand assets) and for
              confirming they have the right to use them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">No guarantees</h2>
            <p className="mt-3">
              We do not guarantee specific results, such as search engine rankings,
              website traffic, sales, or revenue. We aim to deliver quality work, but
              outcomes depend on many factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Changes to these terms</h2>
            <p className="mt-3">
              We may update these terms from time to time. The version published on this
              page is the current one.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Contact us</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
              <a href="mailto:developnearly@gmail.com" className="font-medium text-bright hover:underline">
                developnearly@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-mist">
          <Link href="/" className="text-bright hover:underline">← Back to home</Link>
        </p>
      </main>
      <Footer year={year} />
    </div>
  );
}
