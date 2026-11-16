/**
 * Everything that differs between the two service pages lives here, so
 * prices, packages and FAQs can be edited in one place without touching
 * any component. Prices are in USD.
 */

export type ServiceKey = "video" | "web";

export interface Package {
  name: string;
  price: string;
  /** Numeric price in USD, used to match packages to the visitor's budget. */
  value: number;
  /** Purpose ids this package suits (see purposes). */
  fits: string[];
  /** Small text after the price, e.g. "/ month" or "per video". */
  per?: string;
  tagline: string;
  features: string[];
  /** Highlighted card ("Most popular"). */
  featured?: boolean;
}

/** Answer to "what is it for?" in the welcome questions. */
export interface Purpose {
  id: string;
  label: string;
  hint: string;
  /** Hero copy shown after the visitor picks this purpose. */
  headline: [string, string];
  highlight: string;
  subhead: string;
}

export interface Budget {
  label: string;
  /** Upper end of the range in USD (Infinity for the top range). */
  max: number;
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
  purposeQuestion: string;
  purposes: Purpose[];
  budgetOptions: Budget[];
  steps: Array<{ title: string; text: string }>;
  faqs: Array<{ q: string; a: string }>;
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
        value: 59,
        fits: ["shorts", "reels", "tiktok", "facebook", "business", "other"],
        tagline: "The easy way to test us",
        features: [
          "2 Shorts, Reels or TikToks (up to 60s)",
          "Captions, music & sound effects",
          "Delivered in 48 hours",
          `${REVISIONS} free revisions`,
        ],
      },
      {
        name: "YouTube Video",
        price: "$89",
        per: "per video",
        value: 89,
        fits: ["youtube", "podcast", "business", "other"],
        tagline: "One full video, start to finish",
        features: [
          "1 long-form edit (up to 15 min)",
          "Stock footage, B-roll & text animation",
          "Sound design & music",
          "Delivered in 3–4 days",
          `${REVISIONS} free revisions`,
        ],
      },
      {
        name: "Shorts Pack",
        price: "$149",
        value: 149,
        fits: ["shorts", "reels", "tiktok", "facebook", "podcast", "business", "other"],
        tagline: "A week of short videos",
        features: [
          "6 Shorts, Reels or TikToks",
          "Strong hooks & animated captions",
          "Trending-style cuts, music & SFX",
          "Delivered in 3–4 days",
          `${REVISIONS} free revisions`,
        ],
      },
      {
        name: "Shorts Monthly",
        price: "$299",
        per: "/ month",
        value: 299,
        fits: ["shorts", "reels", "tiktok", "facebook", "podcast", "business", "other"],
        tagline: "Post every day without editing",
        features: [
          "20 Shorts, Reels or TikToks a month",
          "Hooks, captions, music & SFX",
          "One dedicated editor",
          `${REVISIONS} free revisions on every video`,
        ],
      },
      {
        name: "Creator Monthly",
        price: "$399",
        per: "/ month",
        value: 399,
        fits: ["youtube", "podcast", "business", "other"],
        tagline: "For channels that post every week",
        features: [
          "4 long-form videos (up to 15 min)",
          "8 Shorts or Reels",
          "Priority delivery & one dedicated editor",
          `${REVISIONS} free revisions on every video`,
          "Save 10% on a 3-month plan",
        ],
      },
      {
        name: "Pro Channel",
        price: "$899",
        per: "/ month",
        value: 899,
        fits: ["youtube", "shorts", "reels", "tiktok", "facebook", "podcast", "business", "other"],
        tagline: "Your full video team",
        features: [
          "8 long-form videos (up to 20 min)",
          "16 Shorts, Reels or TikToks",
          "Motion graphics & custom animations",
          "Thumbnail design for every video",
          "Same-week delivery & priority support",
          `${REVISIONS} free revisions on every video`,
        ],
      },
    ],
    packagesNote:
      "Longer videos, a different style or a bigger volume? Tell us what you need and we will send a clear, fixed quote",
    purposeQuestion: "Where will your videos go?",
    purposes: [
      {
        id: "youtube",
        label: "YouTube channel",
        hint: "Long videos, faceless or with a host",
        headline: ["EDITS THAT KEEP", "VIEWERS"],
        highlight: "WATCHING",
        subhead: "Long-form YouTube edits for faceless channels and creators, built for retention so people watch to the end",
      },
      {
        id: "shorts",
        label: "YouTube Shorts",
        hint: "Vertical videos under 60 seconds",
        headline: ["SHORTS THAT", "STOP THE"],
        highlight: "SCROLL",
        subhead: "Fast, punchy YouTube Shorts with strong hooks and animated captions, ready to post",
      },
      {
        id: "reels",
        label: "Instagram Reels",
        hint: "Reels for your page or brand",
        headline: ["REELS THAT", "GET YOU"],
        highlight: "NOTICED",
        subhead: "Scroll-stopping Instagram Reels with hooks, captions and music, edited for your page or brand",
      },
      {
        id: "tiktok",
        label: "TikTok",
        hint: "Trending-style short videos",
        headline: ["TIKTOKS THAT", "PEOPLE"],
        highlight: "SHARE",
        subhead: "TikTok videos cut in the style the platform rewards: quick hooks, captions and trending audio",
      },
      {
        id: "facebook",
        label: "Facebook videos",
        hint: "Reels and page videos",
        headline: ["VIDEOS THAT", "GROW YOUR"],
        highlight: "PAGE",
        subhead: "Facebook Reels and page videos that grab attention and bring people back to your page",
      },
      {
        id: "podcast",
        label: "Podcast",
        hint: "Full episodes and short clips",
        headline: ["PODCASTS THAT", "LOOK AS GOOD AS THEY"],
        highlight: "SOUND",
        subhead: "Full podcast episodes edited for YouTube, plus short clips to promote every episode",
      },
      {
        id: "business",
        label: "Business or ads",
        hint: "Promo, product or ad videos",
        headline: ["VIDEOS THAT", "SELL YOUR"],
        highlight: "BUSINESS",
        subhead: "Promo, product and ad videos for your business, edited to grab attention and bring customers",
      },
      {
        id: "other",
        label: "Something else",
        hint: "Tell us later in the form",
        headline: ["EDITS THAT KEEP", "PEOPLE"],
        highlight: "WATCHING",
        subhead: "Long videos, Shorts and Reels for creators and brands, edited for retention, delivered on time",
      },
    ],
    budgetOptions: [
      { label: "Under $100", max: 100 },
      { label: "$100 – $300", max: 300 },
      { label: "$300 – $600", max: 600 },
      { label: "$600 – $1,000", max: 1000 },
      { label: "$1,000+", max: Infinity },
    ],
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
        value: 199,
        fits: ["landing", "portfolio", "business", "notsure"],
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
        value: 499,
        fits: ["business", "portfolio", "redesign", "landing", "notsure"],
        tagline: "Everything a business needs online",
        features: [
          "Up to 5 pages",
          "Services, prices, gallery & contact",
          "Google Maps & WhatsApp",
          "Fast loading & SEO setup",
          "Ready in 1–2 weeks",
          `${REVISIONS} free revisions`,
        ],
      },
      {
        name: "Online Store",
        price: "$799",
        per: "starting",
        value: 799,
        fits: ["store", "redesign", "notsure"],
        tagline: "Sell your products online",
        features: [
          "Product pages, cart & checkout",
          "Payment setup",
          "Easy product management",
          "Ready in 2–3 weeks",
          `${REVISIONS} free revisions`,
        ],
      },
      {
        name: "Premium Custom",
        price: "$1,500",
        per: "starting",
        value: 1500,
        fits: ["business", "store", "redesign", "landing", "portfolio", "notsure"],
        tagline: "A fully custom site that stands out",
        features: [
          "Fully custom design, up to 10 pages",
          "Animations & premium visuals",
          "Copywriting for every page",
          "Online store or booking system if needed",
          "1 month of free updates after launch",
          `${REVISIONS} free revisions`,
        ],
      },
    ],
    packagesNote:
      "Want us to keep your site updated? Add our Care Plan for $49 / month: updates, small changes and backups",
    purposeQuestion: "What kind of website do you need?",
    purposes: [
      {
        id: "business",
        label: "Business website",
        hint: "Restaurant, gym, clinic, shop or company",
        headline: ["A WEBSITE THAT BRINGS", "YOU"],
        highlight: "CUSTOMERS",
        subhead: "A fast, modern website that shows your services, prices and location, and turns visitors into customers",
      },
      {
        id: "landing",
        label: "Landing page",
        hint: "One page for an offer, ad or launch",
        headline: ["ONE PAGE THAT", "TURNS VISITORS INTO"],
        highlight: "LEADS",
        subhead: "A focused landing page for your offer, ad or launch, built to get people to call, book or buy",
      },
      {
        id: "store",
        label: "Online store",
        hint: "Sell products online",
        headline: ["AN ONLINE STORE", "THAT"],
        highlight: "SELLS",
        subhead: "A beautiful online store with product pages, cart and checkout, easy for you to manage",
      },
      {
        id: "portfolio",
        label: "Portfolio / personal",
        hint: "Show your work or personal brand",
        headline: ["A PORTFOLIO THAT", "GETS YOU"],
        highlight: "HIRED",
        subhead: "A clean personal website that shows your work and makes it easy for people to contact you",
      },
      {
        id: "redesign",
        label: "Redesign my website",
        hint: "Make an old site modern",
        headline: ["YOUR WEBSITE,", "BUT"],
        highlight: "BETTER",
        subhead: "We redesign your old website into a fast, modern site that works great on phones",
      },
      {
        id: "notsure",
        label: "Not sure yet",
        hint: "We will help you decide",
        headline: ["WEBSITES THAT BRING", "YOU"],
        highlight: "CUSTOMERS",
        subhead: "Fast, modern websites, landing pages and online stores for businesses that want to be found online",
      },
    ],
    budgetOptions: [
      { label: "Under $250", max: 250 },
      { label: "$250 – $500", max: 500 },
      { label: "$500 – $1,000", max: 1000 },
      { label: "$1,000 – $2,000", max: 2000 },
      { label: "$2,000+", max: Infinity },
    ],
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
  },
};

export const SERVICE_LIST: ServiceInfo[] = [SERVICES.video, SERVICES.web];

/** The visitor's answers to the welcome questions. */
export interface Choice {
  service: ServiceKey;
  purpose: string;
  /** Index into budgetOptions. */
  budget: number;
}

export function purposeOf(choice: Choice): Purpose {
  const info = SERVICES[choice.service];
  return info.purposes.find((p) => p.id === choice.purpose) ?? info.purposes[info.purposes.length - 1];
}

export function budgetOf(choice: Choice): Budget {
  const opts = SERVICES[choice.service].budgetOptions;
  return opts[Math.min(Math.max(choice.budget, 0), opts.length - 1)];
}

/**
 * Packages to show for the visitor's answers: the packages that suit their
 * purpose, the best one that fits their budget marked as recommended, and at
 * most one cheaper and one bigger option around it.
 */
export function recommend(choice: Choice): {
  shown: Package[];
  recommended: Package;
  underBudget: boolean;
} {
  const info = SERVICES[choice.service];
  const budget = budgetOf(choice);
  let pool = info.packages.filter((p) => p.fits.includes(choice.purpose));
  if (pool.length === 0) pool = info.packages;
  pool = [...pool].sort((a, b) => a.value - b.value);
  const affordable = pool.filter((p) => p.value <= budget.max);
  const recommended = affordable.length ? affordable[affordable.length - 1] : pool[0];
  const i = pool.indexOf(recommended);
  let start = Math.max(0, i - 1);
  const end = Math.min(pool.length, start + 3);
  start = Math.max(0, end - 3);
  return { shown: pool.slice(start, end), recommended, underBudget: affordable.length === 0 };
}
