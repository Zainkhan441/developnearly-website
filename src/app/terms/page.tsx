import Link from "next/link";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { Gate } from "../../components/SiteApp";
import { getCurrentYear } from "../year";

export const metadata = {
  title: "Terms of Service | DevelopNearly",
  description: "The terms under which DevelopNearly provides its services",
};

export default async function TermsPage() {
  const year = await getCurrentYear();
  return (
    <Gate>
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
              DevelopNearly provides creative digital services, the exact scope, deliverables, timeline, and price of
              each project are agreed with the client in writing (by email) before work
              begins
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Quotes and payment</h2>
            <p className="mt-3">
              Any price given before a project is agreed is an estimate based on the
              information available at the time, payment is made after the work is
              delivered: the client first receives a watermarked video preview or a
              website on a DevelopNearly preview link, and payment is due within 3 days of
              the client approving it
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Ownership until payment</h2>
            <p className="mt-3">
              Final full-quality video files are sent, and websites are moved to the
              client&apos;s domain with all logins handed over, only after payment is
              received, until then all work, including free sample edits, remains the
              property of DevelopNearly and may not be published, uploaded, copied or used
              in any way
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">What happens if you do not pay</h2>
            <p className="mt-3">
              By approving a preview, the client agrees to pay the agreed price within 3
              days, if payment is not received on time:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                All work, including its copyright, remains the sole property of
                DevelopNearly, no licence to use it is granted until full payment is received
              </li>
              <li>
                Any use, upload, publication, copy or modification of unpaid work is
                copyright infringement
              </li>
              <li>
                DevelopNearly may stop all work, remove preview links, and file copyright
                takedown notices (including under the DMCA) with YouTube, Instagram, TikTok,
                Facebook, hosting providers or any other platform where the work appears
              </li>
              <li>
                A late fee of 10% of the unpaid amount is added for every 7 days the
                payment is late
              </li>
              <li>
                DevelopNearly may take legal action or use a collection service to recover
                the unpaid amount, late fees, and all reasonable collection and legal costs,
                which the client agrees to pay
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Client responsibilities</h2>
            <p className="mt-3">
              Clients are responsible for providing the content and materials needed for
              their project (such as text, images, footage, and brand assets) and for
              confirming they have the right to use them
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">No guarantees</h2>
            <p className="mt-3">
              We do not guarantee specific results, such as search engine rankings,
              website traffic, sales, or revenue, we aim to deliver quality work, but
              outcomes depend on many factors outside our control
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Changes to these terms</h2>
            <p className="mt-3">
              We may update these terms from time to time, the version published on this
              page is the current one
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Contact us</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
              <a href="mailto:developnearly@gmail.com" className="font-medium text-bright hover:underline">
                developnearly@gmail.com
              </a>
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-mist">
          <Link href="/" className="text-bright hover:underline">← Back to home</Link>
        </p>
      </main>
      <Footer year={year} />
    </div>
    </Gate>
  );
}
