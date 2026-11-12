import Link from "next/link";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { getCurrentYear } from "../year";

export const metadata = {
  title: "Privacy Policy | DevelopNearly",
  description:
    "How DevelopNearly handles the information you share when you contact us.",
};

export default async function PrivacyPage() {
  const year = await getCurrentYear();
  return (
    <div className="min-h-full bg-ink font-sans text-white">
      <Nav />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-bright">PRIVACY POLICY</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-mist">Last updated: November 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-white/85">
          <section>
            <h2 className="font-display text-2xl font-bold text-white">What we collect</h2>
            <p className="mt-3">
              When you use the contact form on this website, you share your name, email
              address, company name (optional), the service you are interested in, your
              budget range, and the project details you write.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">How it is sent</h2>
            <p className="mt-3">
              The form does not send anything automatically and there is no server or
              database behind it. Submitting the form opens your own email app with your
              inquiry pre-filled, and the message is only delivered when you press send
              in your email app. Your details go directly to our email inbox at{" "}
              <a href="mailto:developnearly@gmail.com" className="font-medium text-bright hover:underline">
                developnearly@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">How we use it</h2>
            <p className="mt-3">
              We use the information you send only to reply to your inquiry and to discuss
              your project. We do not sell, rent, or share your information with third
              parties, and we do not use it for advertising.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Cookies and tracking</h2>
            <p className="mt-3">
              This website sets no cookies and runs no analytics or tracking scripts.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">Contact us</h2>
            <p className="mt-3">
              If you have any questions about this policy, or you would like us to delete
              an inquiry you sent, email us at{" "}
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
