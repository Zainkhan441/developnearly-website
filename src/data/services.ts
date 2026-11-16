/**
 * Everything that differs between the two service pages lives here, so
 * prices, packages and FAQs can be edited in one place without touching
 * any component. Prices are in USD.
 */

export type ServiceKey = "video" | "web";

export interface Package {
  name: string;
  price: string;
  /** Small text after the price, e.g. "/ month" or "per video". */
  per?: string;
  tagline: string;
  features: string[];
  /** Highlighted card ("Most popular"). */
  featured?: boolean;
}

export interface ServiceInfo {
  key: ServiceKey;
  /** Route of the service page. */
  href: string;
  /** Matching value in the contact form's service dropdown. */
  formValue: string;
  name: string;
  eyebrow: string;
  headline: [string, string];
  highlight: string;
  subhead: string;
  audience: string[];
  services: string[];
  startingFrom: string;
  packages: Package[];
  packagesNote: string;
  steps: Array<{ title: string; text: string }>;
  faqs: Array<{ q: string; a: string }>;
  budgets: string[];
}

export const REVISIONS = 3;

export const SERVICES: Record<ServiceKey, ServiceInfo> = {
  video: {
    key: "video",
    href: "/video",
    formValue: "Video Editing",
    name: "Video Editing",
    eyebrow: "VIDEO EDITING",
    headline: ["EDITS THAT KEEP", "PEOPLE"],
    highlight: "WATCHING",
    subhead:
      "Long-form YouTube videos, Shorts and Reels for faceless channels, creators and brands, edited for retention, delivered on time",
    audience: ["Faceless YouTube channels", "Creators & podcasters", "Brands & local businesses"],
    services: [
      "Faceless YouTube videos",
      "Documentary-style edits",
      "YouTube Shorts & Reels",
      "Captions & text animation",
      "Stock footage & B-roll",
      "Sound design & music",
      "Motion graphics",
      "Podcast clips",
    ],
    startingFrom: "$59",
    packages: [
      {
        name: "Starter",
        price: "$59",
        tagline: "The easy way to test us",
        features: [
          "2 Shorts or Reels (up to 60s)",
          "Captions, music & sound effects",
          "Delivered in 48 hours",
          `${REVISIONS} free revisions`,
        ],
      },
      {
        name: "Creator Monthly",
        price: "$399",
        per: "/ month",
        tagline: "For channels that post every week",
        features: [
          "4 long-form videos (up to 15 min)",
          "8 Shorts or Reels",
          "Priority delivery & one dedicated editor",
          `${REVISIONS} free revisions on every video`,
          "Save 10% on a 3-month plan",
        ],
        featured: true,
      },
      {
        name: "YouTube Video",
        price: "$89",
        per: "per video",
        tagline: "One full video, start to finish",
        features: [
          "1 long-form edit (up to 15 min)",
          "Stock footage, B-roll & text animation",
          "Sound design & music",
          "Delivered in 3–4 days",
          `${REVISIONS} free revisions`,
        ],
      },
    ],
    packagesNote:
      "Longer videos, a different style or a bigger volume? Tell us what you need and we will send a clear, fixed quote",
    steps: [
      { title: "Send your files", text: "Share your script, voiceover or raw footage through Google Drive" },
      { title: "We edit", text: "Your video is cut, captioned and sound-designed in your channel's style" },
      { title: "You review", text: `Watch the first cut and ask for changes, ${REVISIONS} revisions are free` },
      { title: "Ready to upload", text: "You get the final file in full quality, ready for YouTube" },
    ],
    faqs: [
      {
        q: "Do you edit for faceless YouTube channels?",
        a: "Yes, most of our work is faceless content: documentaries, list videos, explainers and sports videos, built from a script and voiceover with stock footage, B-roll and text animation",
      },
      {
        q: "What do I need to send you?",
        a: "For faceless videos, the script and voiceover, plus any example videos you like, for other videos, your raw footage, everything can be shared through Google Drive",
      },
      {
        q: "How fast is delivery?",
        a: "Shorts and Reels in about 48 hours, long-form videos in 3–4 days, monthly clients get priority",
      },
      {
        q: "How many revisions do I get?",
        a: `Every video includes ${REVISIONS} free revisions, so you are happy with the final cut before you upload`,
      },
      {
        q: "Can I try one video first?",
        a: "Yes, start with the Starter package or a single YouTube video, if you like the result you can move to a monthly plan",
      },
      {
        q: "Do you work with clients outside Pakistan?",
        a: "Yes, we work with creators and brands worldwide, fully remote, in English",
      },
    ],
    budgets: ["Under $100", "$100–$300", "$300–$600", "$600+", "Not Sure Yet"],
  },
  web: {
    key: "web",
    href: "/websites",
    formValue: "Website Development",
    name: "Website Development",
    eyebrow: "WEBSITE DEVELOPMENT",
    headline: ["WEBSITES THAT BRING", "YOU"],
    highlight: "CUSTOMERS",
    subhead:
      "Fast, modern websites, landing pages and online stores for businesses that want to be found online and turn visitors into customers",
    audience: ["Restaurants, gyms & clinics", "Shops & online stores", "Startups & service businesses"],
    services: [
      "Business websites",
      "Landing pages",
      "E-commerce stores",
      "Portfolio websites",
      "Mobile-friendly design",
      "WhatsApp & contact forms",
      "Google-friendly (SEO) setup",
      "Website redesigns",
    ],
    startingFrom: "$199",
    packages: [
      {
        name: "Landing Page",
        price: "$199",
        tagline: "One page that sells one thing well",
        features: [
          "1 page, mobile-friendly design",
          "Contact form & WhatsApp button",
          "Basic Google (SEO) setup",
          "Ready in 5–7 days",
          `${REVISIONS} free revisions`,
        ],
      },
      {
        name: "Business Website",
        price: "$499",
        tagline: "Everything a business needs online",
        features: [
          "Up to 5 pages",
          "Services, prices, gallery & contact",
          "Google Maps & WhatsApp",
          "Fast loading & SEO setup",
          "Ready in 1–2 weeks",
          `${REVISIONS} free revisions`,
        ],
        featured: true,
      },
      {
        name: "Online Store",
        price: "$799",
        per: "starting",
        tagline: "Sell your products online",
        features: [
          "Product pages, cart & checkout",
          "Payment setup",
          "Easy product management",
          "Ready in 2–3 weeks",
          `${REVISIONS} free revisions`,
        ],
      },
    ],
    packagesNote:
      "Want us to keep your site updated? Add our Care Plan for $49 / month: updates, small changes and backups",
    steps: [
      { title: "Tell us about your business", text: "What you sell, who your customers are and what the site should do" },
      { title: "We design", text: "You see the design first, before a single page is built" },
      { title: "We build", text: `Your site is built, tested on phones and polished with ${REVISIONS} free revisions` },
      { title: "Go live", text: "We launch your site and show you how everything works" },
    ],
    faqs: [
      {
        q: "How long does a website take?",
        a: "A landing page takes about 5–7 days, a business website 1–2 weeks and an online store 2–3 weeks, once we have your content",
      },
      {
        q: "Will my website work on phones?",
        a: "Yes, every site is designed mobile-first and tested on phones, tablets and computers",
      },
      {
        q: "How many revisions do I get?",
        a: `Every package includes ${REVISIONS} free revisions, so the site looks exactly the way you want`,
      },
      {
        q: "What do I need to give you?",
        a: "Your logo, photos and some text about your business, if you do not have everything yet, we will help you",
      },
      {
        q: "Do you also handle domain and hosting?",
        a: "Yes, we help you choose a domain and set up hosting, domain and hosting fees are paid directly by you, so you own everything",
      },
      {
        q: "Do you work with clients outside Pakistan?",
        a: "Yes, we work with businesses worldwide, fully remote, in English",
      },
    ],
    budgets: ["Under $250", "$250–$500", "$500–$1,000", "$1,000+", "Not Sure Yet"],
  },
};

export const SERVICE_LIST: ServiceInfo[] = [SERVICES.video, SERVICES.web];
